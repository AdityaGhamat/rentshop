import {
  Model,
  FilterQuery,
  Types,
  PipelineStage,
  UpdateWriteOpResult,
} from "mongoose";
import type { IBaseRepositoryInterface } from "@core/repository";
import type { ModelDoc } from "@core/repository";

export class BaseRepository<T extends { _id: any }, K = Partial<T>>
  implements IBaseRepositoryInterface<T, K>
{
  protected model: Model<ModelDoc<T>>;

  constructor(model: Model<ModelDoc<T>>) {
    this.model = model;
  }

  public async create(data: Partial<T>): Promise<T> {
    const doc = await this.model.create(data);
    return doc.toObject() as T;
  }

  buildFilter(args?: FilterQuery<K>): FilterQuery<ModelDoc<T>> {
    const filter: FilterQuery<ModelDoc<T>> = {};
    if (!args) return filter;
    Object.entries(args as Record<string, any>).forEach(([k, v]) => {
      if (v === undefined) return;
      if (Array.isArray(v)) {
        (filter as any)[k] = { $in: v };
      } else {
        (filter as any)[k] = v;
      }
    });
    (filter as any)["isDeleted"] = { $ne: true } as any;
    return filter;
  }

  async find(
    args: FilterQuery<K> = {},
    options: Record<string, any> = {}
  ): Promise<T[]> {
    const filter = this.buildFilter(args);
    const q = this.model.find(filter);

    if (options.select) q.select(options.select);
    if (options.sort) q.sort(options.sort);
    if (options.limit) q.limit(options.limit);
    if (options.skip) q.skip(options.skip);

    const docs = await q.exec();
    return docs.map((d: any) => d.toObject() as T);
  }

  async findOne(
    args: FilterQuery<K>,
    options: Record<string, any> = {}
  ): Promise<T | null> {
    const filter = this.buildFilter(args);
    const q = this.model.findOne(filter);
    if (options.select) q.select(options.select);
    if (options.sort) q.sort(options.sort);
    return (await q.exec())?.toObject() as T | null;
  }

  async findById(
    id: string,
    fields?: string[],
    options: Record<string, any> = {}
  ): Promise<T | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const q = this.model.findById(id);
    if (fields) q.select(fields.join(" "));
    if (options.populate) q.populate(options.populate);
    const doc = await q.exec();
    return doc ? (doc.toObject() as T) : null;
  }

  async findByIdAndUpdate(
    id: string,
    data: Partial<T>,
    options: Record<string, any> = {}
  ): Promise<T | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const opts = { new: true, runValidators: true, ...options };
    const doc = await this.model
      .findByIdAndUpdate(id, data as any, opts)
      .exec();
    return doc ? (doc.toObject() as T) : null;
  }

  async findByIdAndDelete(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) return false;
    const r = await this.model
      .findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() } as any)
      .exec();
    return !!r;
  }
  async updateOne(
    args: FilterQuery<K>,
    data: Partial<T>,
    options?: Record<string, unknown>
  ): Promise<boolean> {
    const filter = this.buildFilter(args);
    const result = (await this.model.updateOne(filter, data as any, {
      ...options,
    })) as unknown as UpdateWriteOpResult;
    return result.modifiedCount > 0;
  }

  async updateMany(
    args: FilterQuery<K>,
    data: Partial<T>,
    options: Record<string, any> = {}
  ): Promise<number> {
    const filter = this.buildFilter(args);
    const res = await this.model
      .updateMany(filter, data as any, { ...options })
      .exec();
    return res.modifiedCount;
  }

  async deleteMany(
    args: FilterQuery<K>,
    options: Record<string, any> = {}
  ): Promise<number> {
    const filter = this.buildFilter(args);
    const res = await this.model
      .updateMany(
        filter,
        { isDeleted: true, deletedAt: new Date() } as any,
        options
      )
      .exec();
    return res.modifiedCount ?? 0;
  }

  async count(args: FilterQuery<K> = {}): Promise<number> {
    const filter = this.buildFilter(args);
    return this.model.countDocuments(filter).exec();
  }

  async exists(args: FilterQuery<K>): Promise<boolean> {
    const filter = this.buildFilter(args);
    const res = await this.model.exists(filter);
    return !!res;
  }

  async aggregate(
    pipeline: Record<string, unknown>[]
  ): Promise<Record<string, unknown>[]> {
    const softDeleteMatch = { $match: { isDeleted: { $ne: true } } };
    const p = [softDeleteMatch, ...pipeline] as PipelineStage[];
    return this.model.aggregate(p).exec();
  }

  async paginate(
    args: FilterQuery<K> = {},
    options: { page: number; limit: number } = { page: 1, limit: 20 }
  ) {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;
    const filter = this.buildFilter(args);

    // give each promise a clean, explicit type
    const totalPromise = this.model
      .countDocuments(filter)
      .exec() as Promise<number>;
    const docsPromise = this.model
      .find(filter as any)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec() as Promise<ModelDoc<T>[]>;

    const [total, docs] = (await Promise.all([totalPromise, docsPromise])) as [
      number,
      ModelDoc<T>[]
    ];

    return {
      data: docs.map((d) =>
        (d as any).toObject ? ((d as any).toObject() as T) : (d as unknown as T)
      ),
      total,
      page,
      limit,
    };
  }
}

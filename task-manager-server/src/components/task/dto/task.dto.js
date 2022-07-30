import joi from "joi";
export class TaskDto {
  static validateCreateTask(body) {
    const schema = joi.object().keys({
      name: joi.string().min(5).max(20).required(),
      completed: joi.boolean().optional(),
    });

    const { error, value } = schema.validate(body);
    if (error && error.name) return { error: this._getErrorMessage(error) };
    return { value };
  }

  static validateUpdateTask(body) {
    const schema = joi.object().keys({
      name: joi.string().min(5).max(20).optional(),
      completed: joi.boolean().optional(),
    });

    const { error, value } = schema.validate(body);
    if (error && error.name) return { error: this._getErrorMessage(error) };
    return { value };
  }

  static _getErrorMessage(error) {
    return error.details.map((detail) => detail.message);
  }
}

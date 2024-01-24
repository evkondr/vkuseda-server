class ApiError extends Error {
  message:string;

  status:number;

  constructor(status: number, message:string) {
    super(message);
    this.message = message;
    this.status = status;
  }

  static BadRequest(message:string) {
    return new ApiError(400, message);
  }

  static Forbidden(message: string) {
    return new ApiError(403, message);
  }

  static NotFound(message: string) {
    return new ApiError(404, message);
  }
}
export default ApiError;

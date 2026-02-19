import IncorrectRequest from "../errors/IncorrectRequestError.js";

async function pagination (req, res, next) {
  try {
    let { limit = 5, page = 1, sort = "_id:1" } = req.query;
    let [sortField, order] = sort.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);
    const result = req.result;

    if (limit > 0 && page > 0) {
      const pagedResult = await result.find()
        .sort({[sortField]: order})
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
           
      res.status(200).json(pagedResult);
    } else {
      next(new IncorrectRequest());
    }
  } catch (erro) {
    next(erro);
  }
}

export default pagination;
//MARK: IMPORTS
import NotFound from "../errors/NotFound.js";


function fourZeroFourManagement(req, res, next){
  const erro404 = new NotFound();
  next(erro404);
}

export default fourZeroFourManagement;
import { Request, Response } from 'express';

/** 
 * User Controller
*/
function home(req: Request, res: Response) {
  res.send('HomeController home function logic!!!');
}

// Export the controller functions
export default {
  home
};
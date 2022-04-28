import {Request, response, Response, Router} from 'express';
import Activity from '../models/Activities';
import Mode from '../models/Mode';
import User from '../models/User';

class ModeRoutes{
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes(); //This has to be written here so that the method can actually be configured when called externally.
    }

    public async getModes(req: Request, res: Response) : Promise<void> { //It returns a void, but internally it's a promise.
        const allModes = await Mode.find().populate('username', 'name -_id');
        if (allModes.length == 0){
            res.status(404).send("There are no modes created!")
        }
        else{
            res.status(200).send(allModes);
        }
    }

    public async getModeByName(req: Request, res: Response) : Promise<void> { //By Id
        const modeFound = await Mode.findOne({username: req.params.nameUser}).populate('username', 'name -_id');
        if(modeFound == null){
            res.status(404).send("The mode doesn't exist!");
        }
        else{
            res.status(200).send(modeFound);
        }
    }

    public async addMode(req: Request, res: Response) : Promise<void> {
        console.log(req.body);
        const {username, mode} = req.body;
        const newMode = new Mode({username, mode});
        await newMode.save();

        const user = await User.findById(username);
        console.log(user);
        //user.mode.push(newMode);
        const userToUpdate = await User.findOneAndUpdate({ username: user.name }, { mode: user.mode});

        res.status(200).send('Mode added!');
    }

    public async updateMode(req: Request, res: Response) : Promise<void> { //By Id      
        console.log(req.body);
        const modeToUpdate = await Mode.findOneAndUpdate ({username: req.params.nameUser}, req.body);
        if(modeToUpdate == null){
            res.status(404).send("The mode doesn't exist!");
        }
        else{
            res.status(200).send('Updated!');
        }
    }

    public async deleteMode(req: Request, res: Response) : Promise<void> { //By Id
        const modeToDelete = await Mode.findOneAndDelete ({username :req.params.nameUser}, req.body);
        if (modeToDelete == null){
            res.status(404).send("The mode doesn't exist!")
        }
        else{
            res.status(200).send('Deleted!');
        }
    } 
    routes(){
        this.router.get('/', this.getModes);
        this.router.get('/:nameUser', this.getModeByName);
        this.router.post('/', this.addMode);
        this.router.put('/:nameUser', this.updateMode);
        this.router.delete('/:nameUser', this.deleteMode);
    }
}

const moderoutes = new ModeRoutes();

export default moderoutes.router;
import {Request, response, Response, Router} from 'express';
import Activity from '../models/Activities';
import Rating from '../models/Rating';
import User from '../models/User';

class RatingRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes(); //This has to be written here so that the method can actually be configured when called externally.
    }

    public async getRatings(req: Request, res: Response) : Promise<void> { //It returns a void, but internally it's a promise.
        const allRatings = await Rating.find().populate('rater', 'name').populate('userRated', 'name username').populate('activityRated', 'name');
        if (allRatings.length == 0){
            res.status(404).send("There are no ratings yet!")
        }
        else{
            res.status(200).send(allRatings);
        }
    }

    public async getRatingsByName(req: Request, res: Response) : Promise<void> {
        const ratingFound = await Rating.findOne({name: req.params.nameRating}).populate('rater', 'name').populate('userRated', 'name username').populate('activityRated', 'name');
        if(ratingFound == null){
            res.status(404).send("The rating doesn't exist!");
        }
        else{
            res.status(200).send(ratingFound);
        }
    }


    public async addRatingUser(req: Request, res: Response) : Promise<void> {
        const {tittle, rating, description} = req.body;

        const rater = await User.findOne({name: req.body.rater});
        const userRated = await User.findOne({name: req.body.userRated});

        if(rater==null||userRated == null){
            res.status(404).send("Rater of user rated don't exist");
        }
        else{
            const newRating = new Rating({tittle, rater, userRated, rating, description});
            const savedRating = await newRating.save();

            userRated.personalRatings.push(newRating._id);
            const userToUpdate = await User.findOneAndUpdate({ _id : userRated }, { personalRatings: userRated.personalRatings});
            res.status(200).send('Rating added!');
        }
    }

    public async addRatingActivity(req: Request, res: Response) : Promise<void> {
        const {tittle,  rating, description} = req.body;

        const rater = await User.findOne({name: req.body.rater});
        const activityRated = await Activity.findOne({name: req.body.activityRated});

        if(rater==null || activityRated==null){
            res.status(404).send("Rater or activity rated don't exist");
        }
        else{
            const newRating = new Rating({tittle, rater, activityRated, rating, description});
            const savedRating = await newRating.save();

            activityRated.ratings.push(newRating._id);

            const activityToUpdate = await Activity.findOneAndUpdate({ _id : activityRated }, { ratings: activityRated.ratings});

            res.status(200).send('Rating added!');
        }
    }

    public async updateRating(req: Request, res: Response) : Promise<void> {
        const ratingToUpdate = await Rating.findOneAndUpdate ({name: req.params.nameRating}, req.body);
        if(ratingToUpdate == null){
            res.status(404).send("The rating doesn't exist!");
        }
        else{
            res.status(200).send('Updated!');
        }
    }

    public async deleteRating(req: Request, res: Response) : Promise<void> {
        const ratingToDelete = await Rating.findOneAndDelete ({name:req.params._id}, req.body);
        if (ratingToDelete == null){
            res.status(404).send("This rating doesn't exist!")
        }
        else{
            res.status(200).send('Deleted!');
        }
    } 
    
    routes() {
        this.router.get('/', this.getRatings);
        this.router.get('/:nameRating', this.getRatingsByName);
        this.router.post('/ratinguser', this.addRatingUser);
        this.router.post('/ratingactivity', this.addRatingActivity);
        this.router.put('/:nameRating', this.updateRating);
        this.router.delete('/:nameRating', this.deleteRating);
    }
}
const ratingRoutes = new RatingRoutes();

export default ratingRoutes.router;
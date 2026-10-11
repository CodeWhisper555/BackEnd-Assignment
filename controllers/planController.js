const Plan = require('../models/plan');

// 1.) GET ALL PLANS
exports.getPlans = async (req, res, next) => {
  try{
    let query = {};
    
    if(req.query.priority) {
      query.priority = req.query.priority;
    }

    if(req.query.search) {
      query.subject = { $regex: req.query.search, $options: 'i' };
    }

    let plansQuery = Plan.find(query);
    
    if(req.query.sort === 'hours') {
      plansQuery = plansQuery.sort('hours');
    }

    const plans = await plansQuery;
    res.status(200).json(plans);
  } 
  catch(err){
    next(err);
  }
};

// 2.) GET PENDING PLANS
exports.getPendingPlans = async (req, res, next) => {
  try{
    const plans = await Plan.find({ completed: false });
    res.status(200).json(plans);
  } 
  catch(err){
    next(err);
  }
};

// 3.) GET PLAN BY ID
exports.getPlanById = async (req, res, next) => {
  try{
    const plan = await Plan.findById(req.params.id);
    if(!plan){
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.status(200).json(plan);
  } 
  catch(err){
    next(err);
  }
};

// 4.) CREATE A PLAN
exports.createPlan = async (req, res, next) => {
  try{
    const newPlan = await Plan.create({
      ...req.body,
      createdBy : req.user.id
    });
    res.status(201).json(newPlan);
  } 
  catch(err){
    next(err);
  }
};

// 5.) UPDATE A PLAN
exports.updatePlan = async (req, res, next) => {
  try{
    const plan = await Plan.findById(req.params.id);
    if(!plan){
      return res.status(404).json({
        error : "Plan Not Found"
      });
    }
    if(String(plan.createdBy) != req.user.id){
      return res.status(403).json({
        error : "You can only change your own plans"
      });
    }

    //Deletes the creator id because it is unnecessary to update it again & again as the creator doesn't change
    delete req.body.createdBy;

    const updated = await Plan.findByIdAndUpdate(
      req.params.id,req.body,
      {returnDocument : "after",runValidators : true}
    );
    res.status(200).json(updated);
  }
  catch(err){
    next(err);
  }
}

// 6.) DELETE A PLAN
exports.deletePlan = async (req, res, next) => {
  try{
    const plan = await Plan.findById(req.params.id);
    if(!plan){
      return res.status(404).json({
        error : "Plan Not Found"
      });
    }
    if(String(plan.createdBy) != req.user.id){
      return res.status(403).json({
        error : "You can only Delete your own plans"
      });
    }
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
    if(!deletedPlan){
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.status(200).json({ message: 'Plan deleted successfully' });
  } 
  catch(err){
    next(err);
  }
};

// 7.) GETTING MY PLANS
exports.getMyPlans = async (req,res,next) =>{
  try{
    const plan = await Plan.find({createdBy : req.user.id});
    res.status(200).json(plan);
  }
  catch(err){
    next(err);
  }
}

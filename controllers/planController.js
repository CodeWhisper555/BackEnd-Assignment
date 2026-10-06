const Plan = require('../models/plan');

// 1.) GET ALL PLANS
exports.getPlans = async (req, res, next) => {
  try{
    let query = {};
    if(req.query.priority){
      query.priority = req.query.priority;
    }

    let plansQuery = Plan.find(query);
    if(req.query.sort === 'hours'){
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
    const newPlan = await Plan.create(req.body);
    res.status(201).json(newPlan);
  } 
  catch(err){
    next(err);
  }
};

// 5.) UPDATE A PLAN
exports.updatePlan = async (req, res, next) => {
  try{
    const updatedPlan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if(!updatedPlan){
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.status(200).json(updatedPlan);
  }
  catch(err){
    next(err);
  }
};

// 6.) DELETE A PLAN
exports.deletePlan = async (req, res, next) => {
  try{
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
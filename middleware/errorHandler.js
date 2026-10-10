const errorHandler = (err, req, res, next) => {
  if(err.name === 'ValidationError'){
    return res.status(400).json({
         Message : err.message 
    });
  }
  if(err.name === 'CastError'){
    return res.status(400).json({
        Error : 'Invalid id' 
    });
  }
  res.status(500).json({
    Message : err.message
  });
};

module.exports = errorHandler;

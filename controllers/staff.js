const Member = require('../models/member');
const fs = require('fs');

exports.createMember = (req, res, next) => {
  req.body.member = JSON.parse(req.body.member);
  const url = req.protocol + '://' + req.get('host');
  const member = new Member({
    title: req.body.member.title,
    description: req.body.member.description,
    imageUrl: url + '/images/' + req.file.filename,
    username: req.body.member.username,
    userId: req.body.member.userId
  });
  member.save().then(
    () => {
      res.status(201).json({
        message: 'Post status saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneMember = (req, res, next) => {
  Member.findOne({
    _id: req.params.id
  }).then(
    (member) => {
      res.status(200).json(member);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyMember = (req, res, next) => {
  let member = new Member({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.member = JSON.parse(req.body.member);
    member = {
      _id: req.params.id,
      title: req.body.member.title,
      description: req.body.member.description,
      imageUrl: url + '/images/' + req.file.filename,
      username: req.body.member.username,
      userId: req.body.member.userId
    };
  } else {
    member = {
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      username: req.body.username,
      userId: req.body.userId
    };
  }
  Member.updateOne({_id: req.params.id}, member).then(
    () => {
      res.status(201).json({
        message: 'Member updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteMember = (req, res, next) => {
  Member.findOne({_id: req.params.id}).then(
    (member) => {
      const filename = member.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Member.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};

exports.getAllStaff = (req, res, next) => {
  Member.find().then(
    (members) => {
      res.status(200).json(members);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
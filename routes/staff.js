const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/staff');

router.get('/', auth, staffCtrl.getAllStaff);
router.post('/', auth, multer, staffCtrl.createMember);
router.get('/:id', auth, staffCtrl.getOneMember);
router.put('/:id', auth, multer, staffCtrl.modifyMember);
router.delete('/:id', auth, staffCtrl.deleteMember);

module.exports = router;
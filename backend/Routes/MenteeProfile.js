const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const MenteeController = require('../Controllers/MenteeController')
const auth = require("../middleware/auth")



router.post('/mentorProfile' ,auth, upload.single('avatar') , MenteeController.addNewMentee)
router.get('/mentorProfile' , MenteeController.getAllMentee)
router.get('/mentorProfile/:id' ,  MenteeController.getMentee)
router.patch('/mentorProfile/:id' ,upload.single('avatar') ,  MenteeController.updateMentee)
router.delete('/mentorProfile/:id' ,  MenteeController.removeMentee)





module.exports = router

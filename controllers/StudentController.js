const Student = require('../models/Student');
const cloudinary = require('cloudinary').v2;
async function addStudent(req, res) {
  try {
    // console.log(req.body, 'req.body');
    // console.log(req.file, "req.file");
    let result;
    if (req.file) {
      cloudinary.config({
        cloud_name: "dulxvleos",
        api_key: "216597559845869",
        api_secret: "RaCWRxKi7OwkqnDI--6htwsco8I"
      })
     result = await cloudinary.uploader.upload(req.file.path);
      // console.log(result);
    }
     let student = new Student(req.body);
     if(req.file){
     student.studentImage = result.secure_url;
     }
      await student.save();
      // console.log("data base updated..");

    let students = await Student.find({})
    res.render('studentlist', {
      students: students
    });
  } catch (err) {
    console.log(err);
  }
}

async function showStudent(req, res) {
  try {
    let students = await Student.find({})
    // console.log(students)
    res.render('studentlist', {
      students: students
    });
  } catch (err) {
    console.log(err);
  }
}

async function deleteStudent(req, res) {
  try {
    let studentId = req.params._id;
    // console.log(studentId, 'deleteStudent');
    await Student.deleteOne({ _id: studentId });
    let students = await Student.find({});
    res.render('welcomeAdmin', {
      students: students
    })
  } catch (err) {
    console.log(err);
  }
}

async function editStudentPage(req, res) {
  try {
    let studentId = req.params._id;
    let student = await Student.findOne({ _id: studentId });
    if (student) {
      res.render('studenteditpage', {
        student: student
      })
    } else {
      res.render('/');
    }
  } catch (err) {
    console.log(err);
  }
}
//  /edit/student/:_id
async function editstudent(req, res) {
  try {
    const studentId = req.params._id;
    // console.log(studentId + " : studentId");
    let student = await Student.findOne({ _id: studentId });
    if (student) {
      console.log(req.body, "req.body");
      student.rollNo = req.body.rollNo;
      student.name = req.body.name;
      student.fatherName = req.body.fatherName;
      student.course = req.body.course;
      student.branch = req.body.branch;
      student.yearOfAdmission = req.body.yearOfAdmission;

      await student.save();

      let students = await Student.find({});
      res.render('welcomeAdmin', {
        students: students
      })
    } else {
      console.log("Student not found..");
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  addStudent,
  showStudent,
  deleteStudent,
  editStudentPage,
  editstudent
}
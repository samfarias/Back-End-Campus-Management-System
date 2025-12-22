/*==================================================
/database/utils/seedDB.js

It seeds the database with several initial students and campuses.
==================================================*/
const { Campus, Student } = require('../models');  // Import database models

// Seed database
const seedDB = async () => {
	// Create a new campus and the campus details named "Hunter College"
	const dummy_campus = await Campus.create({
		name: "Hunter College",
		address: "695 Park Ave, New York, NY 10065",
		description: "This is a school in New York, New York.",
		imageUrl: "https://www.greatvaluecolleges.net/wp-content/uploads/2020/01/cuny-hunter-college.jpg"
	});
	// Create a new campus and the campus details named "Queens College"
	const dummy_campus2 = await Campus.create({
		name: "Queens College",
		address: "65-30 Kissena Blvd, Queens, NY 11367",
		description: "This is a school in Queens, New York.",
		imageUrl: "https://www.qc.cuny.edu/communications/wp-content/uploads/sites/21/2023/08/QC_CUNY_logo_w_bg-01.png"
	});
	// Create a new campus and the campus details named "Brooklyn College"
	const dummy_campus3 = await Campus.create({
		name: "Brooklyn College",
		address: "2900 Bedford Ave, Brooklyn, NY 11210",
		description: "This is a school in Brooklyn, New York."
	});
	
	// Create a new student and the student details for a campus named "Joe Smith"
	const dummy_student = await Student.create({
		firstName: "Joe",
      	lastName: "Smith",
	  	email:     "john.doe@example.com",    
   		imageUrl:  "/default-student.png",    
    	gpa:       2.2                        
	});
	// Create a new student and the student details for a campus named "Mary Johnson"
	const dummy_student2 = await Student.create({
		firstName: "Mary",
     	lastName: "Johnson",
	  	email:     "mary.johnson@example.com",    
	  	imageUrl:  "/default-student.png",    
		gpa:       3.8   
	});
	// Create a new student and the student details for a campus named "Khandakar Wahiduzzaman"
	const dummy_student3 = await Student.create({
		firstName: "Mary",
	  	lastName: "Loo",
	  	email:     "mary@example.com",    
	  	imageUrl:  "/default-student.png",    
		gpa:       1.9   
	});
	// Create a new student and the student details for a campus named "Abdulla Saleh"
	const dummy_student4 = await Student.create({
		firstName: "Sebastian",
	  	lastName: "Jerico",
	  	email:     "Sebaj@example.com",    
	  	imageUrl:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGxj09OCvV9FRDSqZUsbfh7MNfCLFG8nKOw&s",    
		gpa:       4.4  
	});

	// Add students to campuses
	await dummy_student.setCampus(dummy_campus);
	await dummy_student2.setCampus(dummy_campus2);
	await dummy_student3.setCampus(dummy_campus3);
	await dummy_student3.setCampus(dummy_campus);
}

// Export the database seeding function
module.exports = seedDB;
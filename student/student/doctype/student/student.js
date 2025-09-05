// Copyright (c) 2025, Kallu and contributors
// For license information, please see license.txt

frappe.ui.form.on("Student", {
	refresh(frm) {},
	onload(frm) {
		// ==========  Date  ==========
		let date = frappe.datetime.get_today();
		frm.set_value("admission_date", date);

		// ==========  Set Intro  ==========
		frm.set_intro("Hello students. Please fil your form.", "yellow");
	},
	before_save(frm) {
		// ==========  Validation  ==========
		if (frm.doc.email) {
			let email = frm.doc.email.trim().toLowerCase();
			let pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

			if (!pattern.test(email)) {
				frappe.msgprint(__("Please enter a valid Email Address"));
				frm.set_value("email", "");
			} else {
				frm.set_value("email", email);
			}
		}

		let courses = frm.doc.courses;
		let totalFeesVal = 0;
		courses.forEach((course) => {
			totalFeesVal += course.fees;
		});
		frm.doc.total_fees = totalFeesVal;

		console.log(courses.length);
		frm.doc.total_courses_rows = courses.length;
	},

	full_name(frm) {
		// ==========  Validation  ==========
		if (frm.doc.full_name) {
			let word = frm.doc.full_name
				.split(" ")
				.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
			frm.set_value("full_name", word.join(" "));
		}
	},

	fees_paid(frm) {
		// ==========  Fees and Status Condition  ==========
		frm.set_value("admission_status", "Active", frm.doc.fees_paid === 0);
		frm.set_value("admission_status", "Pending", frm.doc.fees_paid === 1);
		frm.save();
	},
});

// frappe.ui.form.on("Student Course", {
// 	before_save(frm, cdt, cdn) {
// 		let row = frappe.get_doc(cdt, cdn);
// 		console.log(row);
// 	},
// });

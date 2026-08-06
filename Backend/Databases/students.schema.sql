CREATE TABLE
    class (
        class_id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        class VARCHAR(100) NOT NULL,
        section VARCHAR(10) NOT NULL,
        room_no VARCHAR(10) ,
        medium VARCHAR(20) NOT NULL DEFAULT 'English',
        school_id UUID NOT NULL,
        FOREIGN KEY (school_id) REFERENCES school (school_id)
    );
CREATE TABLE
    student (
        student_id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        student_name VARCHAR(100) NOT NULL,
        class_id VARCHAR(200) NOT NULL,
        gender VARCHAR(40) NOT NULL,
        reg_no INT NOT NULL UNIQUE,
        fullAddress VARCHAR(100) NOT NULL,
        city VARCHAR(50) NOT NULL,
        state_living VARCHAR(50) NOT NULL,
        pincode INT NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        contact VARCHAR(15) UNIQUE NOT NULL,
        addmission_date DATE NOT NULL DEFAULT CURRENT_DATE,
        roll_no INT NOT NULL UNIQUE,
        school_id UUID NOT NULL,
        FOREIGN KEY (class_id) REFERENCES class (class_id),
        FOREIGN KEY (school_id) REFERENCES school (school_id)
    );
CREATE TABLE
    parent (
        parent_id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        parent_name VARCHAR(100) NOT NULL,
        relation VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        contact VARCHAR(15) UNIQUE NOT NULL,
        education VARCHAR(100) NOT NULL,
        profession VARCHAR(100) NOT NULL,
        student_id UUID NOT NULL ,
        FOREIGN KEY (student_id) REFERENCES school (student_id)
    );
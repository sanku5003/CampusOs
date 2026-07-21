CREATE TABLE school(
	 school_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	 schoolName VARCHAR(100) NOT NULL ,
	 fullAddress VARCHAR(100) NOT NULL ,
	 city VARCHAR(50) NOT NULL ,
	 State_living VARCHAR(50) NOT NULL ,
	 pincode INT NOT NULL ,
	 udiseCode BIGINT UNIQUE NOT NULL ,
	 principal VARCHAR(100) NOT NULL ,
	 email VARCHAR(100) UNIQUE NOT NULL ,
	 contact VARCHAR(15) UNIQUE NOT NULL ,
	 passcode VARCHAR(255) NOT NULL 
	
)


-- //blacklist token schema

CREATE TABLE blacklisted_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES school(school_id) ON DELETE CASCADE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);






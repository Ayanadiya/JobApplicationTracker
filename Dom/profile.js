const editButton = document.getElementById('edit-button');
const nameDisplay = document.getElementById('name');
const roleDisplay = document.getElementById('role');
const jobpreferenceDisplay= document.getElementById('jobpreference');
const joblocationDisplay=document.getElementById('location');
const usernameDisplay = document.getElementById('username');
const editPersonalInfoButton = document.getElementById('edit-personal-info-btn');
const emailDisplay = document.getElementById('email');
const phoneDisplay = document.getElementById('phone');
const addressDisplay = document.getElementById('address');
const editCareerGoalButton = document.getElementById('edit-career-goal-btn');
const careergoalDisplay = document.getElementById('career-goal');
    
 // The elements that are editable
 const nameInput = document.createElement('input');
 nameInput.classList.add('form-control');
 nameInput.placeholder="name";

 const roleInput = document.createElement('input');
 roleInput.classList.add('form-control');
 roleInput.placeholder="role eg:software engineer"

 const jobPreferenceInput = document.createElement('input');
 jobPreferenceInput.classList.add('form-control');
 jobPreferenceInput.placeholder= "on-site";

 const joblocationInput = document.createElement('input');
 joblocationInput.classList.add('form-control');
 joblocationInput.placeholder="location"

 const usernameInput = document.createElement('input');
 usernameInput.classList.add('form-control');
   
const phoneInput = document.createElement('input');
phoneInput.classList.add('form-control');
   
const addressInput = document.createElement('input');
addressInput.classList.add('form-control');


const careerGoalInput = document.createElement('input');
careerGoalInput.classList.add('form-control');


editButton.addEventListener('click', editProfile);
 // Toggle between "View" and "Edit" modes for profile info
 let isEditing = false;
function editProfile(){
    if (isEditing) {
        const token=localStorage.getItem('token');
        const name = nameInput.value;
        const role = roleInput.value;
        const jobPreference=jobPreferenceInput.value;
        const joblocation=joblocationInput.value;
        const profile={
             name,
             role,
             jobPreference,
             joblocation
        }
        axios.post('http://127.0.0.1:3000/profile/updateprofile',profile,{headers: { 'Authorization': `Bearer ${token}` }})
        .then(res=>{
            nameDisplay.textContent = name;
            roleDisplay.textContent = role;
            usernameDisplay.textContent = name;
            jobpreferenceDisplay.textContent=jobPreference;
            joblocationDisplay.textContent=joblocation;    
    }).catch(error => {
        console.log(error);
    })
        // Hide inputs and show text again
        nameDisplay.style.display = 'block';
        roleDisplay.style.display = 'block';
        usernameDisplay.style.display = 'block';
        jobpreferenceDisplay.style.display='block';
        joblocationDisplay.style.display='block';
        nameInput.style.display = 'none';
        roleInput.style.display = 'none';
        usernameInput.style.display = 'none';
        jobPreferenceInput.style.display='none';
        joblocationInput.style.display='none';
        
        // Change button text
        editButton.textContent = 'Edit Profile';
    } else {
        // Switch to edit mode
        nameInput.value = nameDisplay.textContent;
        roleInput.value = roleDisplay.textContent;
        jobPreferenceInput.value = jobpreferenceDisplay.textContent;
        joblocationInput.value = joblocationDisplay.textContent;
        usernameInput.value = usernameDisplay.textContent;
        

        nameDisplay.style.display = 'none';
        roleDisplay.style.display = 'none';
        usernameDisplay.style.display = 'none';
        jobpreferenceDisplay.style.display='none';
        joblocationDisplay.style.display='none';
        nameInput.style.display = 'block';
        roleInput.style.display = 'block';
        usernameInput.style.display = 'block';
        jobPreferenceInput.style.display='block';
        joblocationInput.style.display='block';

        // Insert inputs in place of the text
        nameDisplay.parentElement.insertBefore(nameInput, nameDisplay);
        roleDisplay.parentElement.insertBefore(roleInput, roleDisplay);
        usernameDisplay.parentElement.insertBefore(usernameInput, usernameDisplay);
        jobpreferenceDisplay.parentElement.insertBefore(jobPreferenceInput, jobpreferenceDisplay);
        joblocationDisplay.parentElement.insertBefore(joblocationInput, joblocationDisplay);

        // Change button text
        editButton.textContent = 'Save Profile';
    }

    isEditing = !isEditing;
}

let isEditingPersonalInfo = false;
editPersonalInfoButton.addEventListener('click', editPersonalInfo)

function editPersonalInfo(){
    if (isEditingPersonalInfo) {
        const token=localStorage.getItem('token');
        const phone=phoneInput.value;
        const address=addressInput.value;
        const personalinfo={
            phone,
            address
        }
        axios.post('http://127.0.0.1:3000/profile/updatepersonalinfo',personalinfo,{headers: { 'Authorization': `Bearer ${token}` }})
        .then(res => {
            const profile=res.data;
            phoneDisplay.textContent = profile.phone
            addressDisplay.textContent = profile.address
        })
        .catch(error =>{
            console.log(error);
        })
        // Hide inputs and show text again
        emailDisplay.style.display = 'block';
        phoneDisplay.style.display = 'block';
        addressDisplay.style.display = 'block';
        phoneInput.style.display = 'none';
        addressInput.style.display = 'none';
        
        // Change button text
        editPersonalInfoButton.textContent = 'Edit Personal Info';
    } else {
        // Switch to edit mode
        phoneInput.value = phoneDisplay.textContent; 
        addressInput.value = addressDisplay.textContent;

        emailDisplay.style.display = 'block';
        phoneDisplay.style.display = 'none';
        addressDisplay.style.display = 'none';
        phoneInput.style.display = 'block';
        addressInput.style.display = 'block';

        // Insert inputs in place of the text
        phoneDisplay.parentElement.insertBefore(phoneInput, phoneDisplay);
        addressDisplay.parentElement.insertBefore(addressInput, addressDisplay);

        // Change button text
        editPersonalInfoButton.textContent = 'Save Personal Info';
    }

    isEditingPersonalInfo = !isEditingPersonalInfo;
}

editCareerGoalButton.addEventListener('click', editCareerGoal)
let isEditingCareerGoals=false;
function editCareerGoal(){
    if(isEditingCareerGoals)
    {
        const token=localStorage.getItem('token');
        const careergoal=careerGoalInput.value;
        axios.post('http://127.0.0.1:3000/profile/updatecareergoal',{careergoal},{headers: { 'Authorization': `Bearer ${token}` }})
        .then(res => {
            careergoalDisplay.textContent=res.data.careerGoals
        })
        .catch(error =>{
            console.log(error);
        })
        careergoalDisplay.style.display='block';
        careerGoalInput.style.display='none';

        editPersonalInfoButton.textContent='Edit Carrer Goals';
    }else{
        careerGoalInput.value = careergoalDisplay.textContent;

        careergoalDisplay.style.display='none';
        careerGoalInput.style.display='block';

        careergoalDisplay.parentElement.insertBefore(careerGoalInput, careergoalDisplay);

        editCareerGoalButton.textContent='Save Career Goals'
    }
    isEditingCareerGoals=!isEditingCareerGoals;
}
// Wait for the DOM to fully load
window.addEventListener('DOMContentLoaded', function () {
    const token=localStorage.getItem('token');
    axios.get('http://127.0.0.1:3000/user/userdetails',{headers: { 'Authorization': `Bearer ${token}` }})
    .then(res => {
            // Assuming the response structure is correct
            const user = res.data.user;
            const profile = res.data.profile;

            // Populate user and profile information
            nameDisplay.textContent = user.username;
            usernameDisplay.textContent = user.username;
            emailDisplay.textContent = user.email;
            jobpreferenceDisplay.textContent = profile.jobPreference;
            joblocationDisplay.textContent = profile.locationPreference;
            phoneDisplay.textContent = profile.phone;
            addressDisplay.textContent = profile.address;
            careergoalDisplay.textContent = profile.careerGoals;
            roleDisplay.textContent = profile.role;
    
    })
    .catch(error => {
        console.log('This is error',error);
    })
});

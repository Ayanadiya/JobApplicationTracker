

window.addEventListener('DOMContentLoaded', () =>{
    const token=localStorage.getItem('token');
    axios.get('http://127.0.0.1:3000/application/getapplication', {headers: { 'Authorization': `Bearer ${token}` }} )
    .then(res =>{
          const applications=res.data;
          console.log('Received applications:', applications);

            if (Array.isArray(applications) && applications.length > 0) {
                applications.forEach(application => {
                    addToapplnlist(application);
                });
            } else {
                console.error('Expected an array of applications, but received:', applications);
            }
    })
    .catch(error =>{
        console.log(error);
    })
});

const applndetailpara=document.getElementById('applndetailpara');
const applndetail=document.getElementById('application-details');
const saveapplnbtn=document.getElementById('SaveApplicationbtn');
const applicationlist=document.getElementById('applicationlist');
saveapplnbtn.addEventListener('click', saveapplication);

const searchText = document.getElementById('searchText');
const statusFilter = document.getElementById('statusFilter');
const startDate = document.getElementById('startDate');
const applyFilterBtn = document.getElementById('applyFilterBtn');

let isUpdatingAppln=false;

function addToapplnlist(application){
    const li=document.createElement('li');
    li.textContent=`${application.jobtitle}--${application.company}`;
    const updatebtn=document.createElement('button');
    updatebtn.textContent="Update";
    updatebtn.onclick= () => updateapplnform(application.id);
    const viewbtn=document.createElement('button');
    viewbtn.textContent="View";
    viewbtn.onclick= () => viewapplication(application.id);
    const reminderbtn=document.createElement('button');
    reminderbtn.textContent="Set Reminder";
    reminderbtn.onclick= () => setReminder(application.id, application.userId);
    li.appendChild(updatebtn);
    li.appendChild(viewbtn);
    li.appendChild(reminderbtn);
    applicationlist.appendChild(li);
}

async function saveapplication(event){
    event.preventDefault();
    console.log("fetching inputs");
    const token=localStorage.getItem('token');
    const jobtitle=document.getElementById('jobTitle').value;
    const company=document.getElementById('company').value;
    const description=document.getElementById('jobDescription').value;
    const applydate=document.getElementById('applicationDate').value;
    const status=document.getElementById('status').value;
    const notes=document.getElementById('notes').value;

    const resumeInput=document.getElementById('resume');
    const cvInput=document.getElementById('cv');

    let resumeUrl = '';
    let cvUrl = '';


    // Upload resume and cover letter (if provided)
    if (resumeInput.files.length > 0) {
        const resumeFile = resumeInput.files[0];
        console.log("resume file is processed");
          const formData = new FormData();
          formData.append('file', resumeFile);  // Append the file to the formData
          console.log('formData', formData);
          console.log('sending to upload file')
          try {
            const uploadResponse = await axios.post('http://127.0.0.1:3000/application/uploadfile', formData);
            resumeUrl = uploadResponse.data.fileUrl;
        } catch (error) {
            console.error('Resume upload failed', error);
            return alert('Resume upload failed');
        }
    }

    if (cvInput.files.length > 0) {
        const cvFile = cvInput.files[0];
        console.log("cv file processed");
          const formData = new FormData();
          formData.append('file', cvFile);  // Append the file to the formData
          console.log('formData', formData);
          console.log('sending to upload file')
          try {
            const uploadResponse = await axios.post('http://127.0.0.1:3000/application/uploadfile', formData);
            cvUrl = uploadResponse.data.fileUrl;
        } catch (error) {
            console.error('CV upload failed', error);
            return alert('CV upload failed');
        }
    }


    const application={
        jobtitle,
        company,
        description,
        applydate,
        status,
        notes,
        resumeUrl,
        cvUrl
    }
    if(isUpdatingAppln)
    {
        console.log("updating application");
        const applnid=localStorage.getItem('applnid');
    axios.put(`http://127.0.0.1:3000/application/updateapplication/${applnid}`, application, {headers: { 'Authorization': `Bearer ${token}` }} )
    .then(res =>{
        alert("Application updated");
        localStorage.removeItem('applnid');
        isUpdatingAppln=false;
    })
  .catch(error =>{
      console.log(error);
      isUpdatingAppln=false;
    })    
    }else{
        console.log("adding application");
        axios.post('http://127.0.0.1:3000/application/addapplication', application, {headers: { 'Authorization': `Bearer ${token}` }} )
        .then(res =>{
              const application=res.data;
              addToapplnlist(application);
              alert("Application Added")
        })
        .catch(error =>{
            console.log(error);
        }) 
    }    
}

function updateapplnform(applnId){
    const token=localStorage.getItem('token');
    axios.get(`http://127.0.0.1:3000/application/getapplicationdetail/${applnId}`)
    .then(res=>{
        const application=res.data;
        document.getElementById('jobTitle').value = application.jobtitle;
        document.getElementById('company').value = application.company;
        document.getElementById('jobDescription').value = application.description;
        document.getElementById('applicationDate').value = formatDateToInputFormat(application.applydate);
        document.getElementById('status').value = application.status;
         document.getElementById('notes').value = application.notes;

        // Handle file inputs (if any)
        document.getElementById('resume').value = application.resume || '';
        document.getElementById('cv').value = application.cv || '';
        isUpdatingAppln=!isUpdatingAppln;
        localStorage.setItem('applnid', application.id);
        saveapplnbtn.textContent='Update Application';
         // Show the modal
        $('#addApplicationModal').modal('show');
    })
    .catch(error => {
        console.log(error);
    })
            
}

function formatDateToInputFormat(dateString) {
    const date = new Date(dateString); // Convert the ISO string to a Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Return in "yyyy-MM-dd" format
}

function viewapplication(applnId) {
    const token=localStorage.getItem('token');
    axios.get(`http://127.0.0.1:3000/application/getapplicationdetail/${applnId}` )
    .then(res => {
        const application=res.data
        applndetailpara.innerHTML = `
        <strong>Job Title:</strong> ${application.jobtitle}<br>
        <strong>Company:</strong> ${application.company}<br>
        <strong>Job Description:</strong> ${application.description}<br>
        <strong>Application Date:</strong> ${application.applydate}<br>
        <strong>Status:</strong> ${application.status}<br>
        <strong>Notes:</strong> ${application.notes}<br>
        <strong>Resume:</strong> <a href="${application.resume}" target="_blank">Download Resume</a><br>
        <strong>Cover Letter:</strong> <a href="${application.coverletter}" target="_blank">Download Cover Letter</a>
    `;
    })
    .catch(error =>{
        console.log(error)
    }) 
};

function setReminder(applicationId, userId) {
    const token=localStorage.getItem('token');
    // Prompt user to set reminder for a specific application
    const reminderDate = prompt("Enter reminder date (YYYY-MM-DD):");
    
    if (reminderDate) {
        // Send reminder request to server
        axios.post('http://127.0.0.1:3000/application/setReminder', {
            applicationId,
            userId,
            reminderDate
        }, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
            alert("Reminder set successfully!");
        })
        .catch(error => {
            console.log("Error setting reminder:", error);
        });
    }
}

function fetchApplications() {
    const token = localStorage.getItem('token');
    
    let searchQuery = searchText.value || ''; // Get the search query (Company or Job Title)
    let status = statusFilter.value || ''; // Get the selected status
    let start = startDate.value || ''; // Get the start date

    const queryParams = new URLSearchParams({
        search: searchQuery,
        status: status,
        startDate: start
    });

    axios.get(`http://127.0.0.1:3000/application/getsearchapplications?${queryParams.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
        const applications = res.data;
        console.log('Received applications:', applications);

        // Clear previous list
        applicationlist.innerHTML = '';

        if (Array.isArray(applications) && applications.length > 0) {
            applications.forEach(application => {
                addToapplnlist(application);
            });
        } else {
            console.error('Expected an array of applications, but received:', applications);
        }
    })
    .catch(error => {
        console.log('Error fetching applications:', error);
    });
}

// Event listener for Apply Filter button
applyFilterBtn.addEventListener('click', () => {
    fetchApplications(); // Fetch applications based on current filters
});

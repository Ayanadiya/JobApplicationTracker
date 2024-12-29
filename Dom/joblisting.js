window.addEventListener('DOMContentLoaded', () =>{
    const token=localStorage.getItem('token');
    axios.get('http://127.0.0.1:3000/joblist/getjobs', {headers: { 'Authorization': `Bearer ${token}` }} )
    .then(res =>{
          const jobs=res.data;
          console.log('Received jobs:', jobs);

            if (Array.isArray(jobs) && jobs.length > 0) {
                jobs.forEach(job => {
                    addToJoblist(job);
                });
            } else {
                console.error('Expected an array of companies, but received:', jobs);
            }
    })
    .catch(error =>{
        console.log(error);
    })
});

const savejobbtn=document.getElementById('SaveJobbtn');
const joblist=document.getElementById('joblist');
savejobbtn.addEventListener('click', saveJob);

function addToJoblist(job){
    const li=document.createElement('li');
    li.innerHTML=`<strong>Role:</strong> ${job.jobtitle}<br>
                  <strong>Company:</strong> ${job.company}<br>
                  <a href="${job.applylink}" target="_blank">
                            <button class="apply-button">Go to Application</button>
                        </a>`
    const deletebtn=document.createElement('button');
    deletebtn.textContent="Delete";
    deletebtn.onclick= () => deleteJob(job.id,li);
    li.appendChild(deletebtn);
    joblist.appendChild(li);
}

function saveJob(){
    const token=localStorage.getItem('token');
    const jobtitle=document.getElementById('jobtitle').value;
    const company=document.getElementById('company').value;
    const link=document.getElementById('link').value;
    const job={
        jobtitle,
        company,
        link
    }
    axios.post('http://127.0.0.1:3000/joblist/addjob', job, {headers: { 'Authorization': `Bearer ${token}` }} )
    .then(res => {
           const joblist=res.data;
           addToJoblist(joblist);
    })
    .catch(error => {
        console.log(error);
    })
}

function deleteJob(id, li) {
    axios.put(`http://127.0.0.1:3000/joblist/deletejob/${id}`)
    .then(res =>{
        alert(res.data.message);
        joblist.removeChild(li);
    })
    .catch(error => {
        console.log(error);
    })
}

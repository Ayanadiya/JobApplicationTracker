window.addEventListener('DOMContentLoaded', () => {
    getapplictionsummary();
    getCompanies();
    getJoblist();
})

const applicationpara=document.getElementById('applnpara');
const companypara=document.getElementById('companypara');
const joblistpara=document.getElementById('joblistpara');

function getapplictionsummary(){
    const token=localStorage.getItem('token');
    axios.get('http://127.0.0.1:3000/application/getapplicationsummary', {headers: { 'Authorization': `Bearer ${token}` }} )
    .then(res =>{
        const applicationSummary=res.data;
        applicationpara.innerHTML=`
            <h3>Application Summary</h3>
            <p><strong>Total Applications:</strong> ${applicationSummary.totalApplications}</p>
            <p><strong>Applied:</strong> ${applicationSummary.applied}</p>
            <p><strong>Interviewing:</strong> ${applicationSummary.interviewing}</p>
            <p><strong>Offers Received:</strong> ${applicationSummary.offered}</p>
            <p><strong>Rejected:</strong> ${applicationSummary.rejected}</p>
        `;
    })
    .catch(error => {
        console.log(error);
    })   
}

function getCompanies(){
    const token=localStorage.getItem('token');
    axios.get('http://127.0.0.1:3000/company/totalcompanies', {headers: { 'Authorization': `Bearer ${token}` }} )
    .then(res =>{
        const company=res.data;
        companypara.innerHTML=`<p><strong>Companies listed:</strong> ${company}</p>`;
    })
    .catch(error => {
        console.log(error);
    })
}

function getJoblist(){
    const token=localStorage.getItem('token');
    axios.get('http://127.0.0.1:3000/joblist/totaljobs', {headers: { 'Authorization': `Bearer ${token}` }} )
    .then(res =>{
        const totaljoblist=res.data;
        joblistpara.innerHTML=`<p><strong>Jobs listed:</stron>${totaljoblist}</p>`;    
    })
    .catch(error => {
        console.log(error);
    })
}

window.addEventListener('DOMContentLoaded', () =>{
    const token=localStorage.getItem('token');
    axios.get('http://127.0.0.1:3000/company/getcompany', {headers: { 'Authorization': `Bearer ${token}` }} )
    .then(res =>{
          const companies=res.data;
          console.log('Received companies:', companies);

            if (Array.isArray(companies) && companies.length > 0) {
                companies.forEach(company => {
                    addToCompanylist(company);
                });
            } else {
                console.error('Expected an array of companies, but received:', companies);
            }
    })
    .catch(error =>{
        console.log(error);
    })
});

const companydetailpara=document.getElementById('companydetailpara');
const companydetail=document.getElementById('company-details');
const savecompanybtn=document.getElementById('SaveCompanybtn');
const companylist=document.getElementById('companylist');
savecompanybtn.addEventListener('click', saveCompany);

let isUpdating=false;

function addToCompanylist(Company){
    const li=document.createElement('li');
    li.textContent=Company.name;
    const updatebtn=document.createElement('button');
    updatebtn.textContent="Update";
    updatebtn.onclick= () => updateform(Company.id);
    const viewbtn=document.createElement('button');
    viewbtn.textContent="View";
    viewbtn.onclick= () => viewcompany(Company.id);
    li.appendChild(updatebtn);
    li.appendChild(viewbtn);
    companylist.appendChild(li);
}

function saveCompany(event){
    event.preventDefault();
    const token=localStorage.getItem('token');
    const name=document.getElementById('name').value;
    const size=document.getElementById('size').value;
    const industry=document.getElementById('industry').value;
    const contact=document.getElementById('contact').value;
    const notes=document.getElementById('notes').value;

    const companydetail={
        name,
        size,
        industry,
        contact,
        notes
    }
    if(isUpdating)
    {
        const id=localStorage.getItem('companyId');
        axios.put(`http://127.0.0.1:3000/company/updatecompanydetails/${id}`, companydetail )
        .then(res =>{
              const company=res.data;
              alert("Updated Successfully");
              isUpdating=false;
        })
        .catch(error =>{
            console.log(error);
            isUpdating=false;
        })
    }else{
        axios.post(`http://127.0.0.1:3000/company/addcompany`, companydetail, {headers: { 'Authorization': `Bearer ${token}` }} )
        .then(res => {
            const company=res.data;
            alert("Company Added");
            addToCompanylist(company);
        })
        .catch(error =>{
            console.log(error);
        })
          
    }
}

function updateform(id){
    axios.get(`http://127.0.0.1:3000/company/getcompanydetails/${id}` )
    .then(res => {
        const company=res.data;
        document.getElementById('name').value = company.name;
        document.getElementById('size').value = company.size;
        document.getElementById('industry').value = company.industry;
        document.getElementById('contact').value = company.contact;
        document.getElementById('notes').value = company.notes;

        isUpdating=!isUpdating;
        localStorage.setItem('companyId', company.id);
        savecompanybtn.textContent='Update';
         // Show the modal
        $('#addCompanyModal').modal('show');
    })
    .catch(error=>{
        console.log(error);
    })  
}

function viewcompany(id){
    axios.get(`http://127.0.0.1:3000/company/getcompanydetails/${id}` )
    .then(res => {
        const company=res.data;
        companydetailpara.innerHTML = `
        <strong>Company:</strong> ${company.name}<br>
        <strong>Size:</strong> ${company.size}<br>
        <strong>Industry:</strong> ${company.industry}<br>
        <strong>Contact</strong> ${company.contact}<br>
        <strong>Notes:</strong> ${company.notes}<br>
    `;
    })
    .catch(error=>{
        console.log(error);
    })  
}
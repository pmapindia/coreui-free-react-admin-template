const AgentValidation =(SVPDAgentAdd)=> {
    let errors={};
    if(!SVPDAgentAdd.agent_name){
        errors.agent_name="Name is Required.";
    }
    if(!SVPDAgentAdd.agent_mobile_number){
        errors.agent_mobile_number="Mobile Number is Required";
    }
    if(!SVPDAgentAdd.agent_email){
        errors.agent_email="E - mail is required";
    } 
    if(!SVPDAgentAdd.agent_password){
        errors.agent_password="Password is Required";
    } 
    if(!SVPDAgentAdd.agent_address){
        errors.agent_address="Address is Required";
    } 
    if(!SVPDAgentAdd.agent_type){
        errors.agent_type="Type is Required";
    } 
    // if(!SVPDAgentAdd.agent_email){
    //     errors.agent_email="E - mail is Required";
    // } 
   

   return errors;
}
export default AgentValidation;
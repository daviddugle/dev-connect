import React, {useState, useContext, useEffect } from "react";
import UserContext from "../../Store/UserContext";
import { Redirect } from "react-router";
import axios from "axios";
import { useHistory } from "react-router-dom";


const allSkills = ["API", "AJAX", "CSS", "HTML", "Java", "Javascript", "JQuery", "MySQL", "MongoDB", "NodeJS", "Python", "React", "Sequelize"];
// const newOps = [];

const SelfEdit = () => {

  const [registerSkill, setRegisterSkill] = useState([]);
  const [mostFrequent, setMostFrequent] = useState([])
  const { username, skill, setSkills } = useContext(UserContext);


  const history = useHistory();

  const register = (event) => {
    event.preventDefault();
    console.log("skills were changed");
    axios.put("/api/selfedit",{
        skill: registerSkill})
        .then((res) => {
      setSkills(registerSkill)
      history.push("/message");
    })

  };

  let fullSkillsList = allSkills
  useEffect(()=>{
    const unskilledArray = fullSkillsList.filter(singleSkill => skill.includes(singleSkill))
    setMostFrequent(unskilledArray)
  },[skill])
  
  const handleMultiSelect = e => {
    const options = e.target.options;
    const selectedArray = []

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedArray.push(options[i].value);
      }

    }
    setRegisterSkill(selectedArray)
  }

  return (
    username ? (

      <div>
        <h1>Edit Skills</h1>

        <>
          <h5 className="text-center caveat">Strengths</h5>
          <ul>
            {skill.map((specificSkill, i) => <li key={i}> {specificSkill} </li>)}


          </ul>
        </>
        
        <form onSubmit={register}>
          <div className="grid-x">
            <div className="small-3 cell"></div>
            <div className="small-6 cell">
              <label>
                <h4 className="header"><span>Select Your Skills</span></h4><h5 className="header"><span> (Multiple Select Menu)</span></h5>
              </label>
              <label className="caveat"><h5>
                <select onChange={handleMultiSelect} multiple>
                  {allSkills.map((skill, i) => <option key={i} id={`skill${skill}`} value={skill}>{skill}</option>)}
                </select></h5>
              </label>
            </div>
          </div>
          <div className="small-8 cell">
            <button className="button large hover" type='submit' >Submit</button>
          </div>
   </form>
      </div>
    )

      : <Redirect to="/" />
  );
}


export default SelfEdit;



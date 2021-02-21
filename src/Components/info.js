import { useContext, useEffect, useState } from "react"
import { api_get_student } from "../API/action"
import userContext from "./userContext"


export const Info = (props) => {
    const {user} = useContext(userContext)
    
    const [student, setStudent] = useState()
    
    useEffect(() => {
        api_get_student((data) => setStudent(data))
    },[])
    if (!user) {
        return <div>You are not log in!</div>
    }
    if (student) {
        return (
            <>
            <div>Name: {student.name}</div>
            <div>DoB: {student.dob}</div>
            <div>House: {student.hid}</div>
            <div>GPA: {student.gpa}</div>
            <div>Credit: {student.credit}</div>
            </>
        )
    } else {
        return <div>Loading...</div>
    }
}

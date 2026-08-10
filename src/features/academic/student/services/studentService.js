import { studentApi } from "../api/studentApi";

export const studentService = {

    register: (data) => studentApi.registerStudent(data),
    create: (data) => studentApi.createStudent(data),
    update: (id, data) => studentApi.updateStudent(id, data),
    delete: (id) => studentApi.deleteStudent(id),
    get: (id) => studentApi.getStudent(id),
    list: (filters) => studentApi.getStudents(filters),
};
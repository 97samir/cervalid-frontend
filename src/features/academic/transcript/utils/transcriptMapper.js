export const toTranscriptForm = (transcript = {}) => ({
    
    academicPeriod: transcript.academicPeriod ?? "",

    items: (transcript.items ?? []).map((item) => ({
        publicId: item.publicId,
        courseCode: item.courseCode ?? "",
        courseName: item.courseName ?? "",
        credits: item.credits ?? "",
        grade: item.grade ?? "",
    })),
});

export const toCreateTranscriptRequest = (form) => ({

    academicPeriod: form.academicPeriod,

    items: form.items.map((item) => ({

        courseCode: item.courseCode,
        courseName: item.courseName,
        credits: Number(item.credits),
        grade: Number(item.grade),
    })),
});

export const toTranscriptItemRequest = (item) => ({

    courseCode: item.courseCode,
    courseName: item.courseName,
    credits: Number(item.credits),
    grade: Number(item.grade),
});

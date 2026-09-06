export const toTranscriptForm = (
    transcript = {}) => ({

    academicPeriodType: transcript.academicPeriodType ?? "CYCLE",
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
    academicPeriodType: form.academicPeriodType,

    academicPeriod: form.academicPeriod,

    items: form.items.map((item) => ({
        courseCode: item.courseCode.trim(),
        courseName: item.courseName.trim(),
        credits: Number(item.credits),
        grade: Number(item.grade),
    })),
});

export const toTranscriptItemRequest = (item) => ({
    courseCode: item.courseCode.trim(),
    courseName: item.courseName.trim(),
    credits: Number(item.credits),
    grade: Number(item.grade),
});

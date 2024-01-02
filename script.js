// course info
const courseInfo = {
    id: 451,
    neme: "Intro to JavaScript",
}

const assignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    // the ID of the cousre the assignment group belongs to
    course_id: 451,
    // the percentage weight of the entire assignment group
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2024-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2024-02-16",
            points_possible: 150

        },
        {
            id: 3,
            name: "Code the World",
            due_at: "2024-02-27",
            points_possible: 500
        }
    ]

};

// The provided learner submissions data
const learnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission:{
            submitted_at: "2024-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2024-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2024-01-25",
            score: 200
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission:{
            submitted_at: "2024-03-07",
            score: 140
        }
    }
];

//calculate percentage
function calculatePercentage(score, maxPoints){
    return(score/ maxPoints) * 100;
}


// late submissions
function lateSubmission(submitted_at, due_at, score, maxPoints){
    if (new Date(submitted_at) > new Date (due_at)){
        //take off 10% for being late
        const pointsOff = .1 * maxPoints;
        return Math.max(score - pointsOff, 0);
    }
    return score;
}


function getLearnerData (courseInfo, assignmentGroup, learnerSubmissions) {
    try {
        
        const learnerData= {};

        for (const submission of learnerSubmissions){
            const assignment = assignmentGroup.assignments.find(a => a.id === submission.assignment_id);

            if(assignment){
                const weightedScore = lateSubmission(submission.submitted_at, assignment.due_at, submission.score, assignment.points_possible);
                
                const percentage = calculatePercentage(weightedScore, assignment.points_possible);

                learnerData[submission.learner_id] = learnerData[submission.learner_id] || {
                    id: submission.learner_id,
                    avg: 0,
                };
                learnerData[submission.learner_id][assignment.id] = percentage; 
                learnerData[submission.learner_id].avg += (percentage * assignment.points_possible) / 100 ;
            }
        }
        const result = Object.values(learnerData).map(data => {
            data.avg /= assignmentGroup.assignments.reduce((total, assignment) => total + assignment.points_possible, 0);
            return data;
        });
        return result;
    } catch (error) {
        console.error(error.message);
    }
}


const result = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);

console.log(result);
import { gql } from '@apollo/client';

export const ADMIN_PROFILE =gql`
query{
  AdminProfile{
    _id
    userName
    email
    phone
    location
  }
}
`

export const USERS = gql`
    query {
        listApplicationusers {
            _id
            name
            username
            email
            companyName
            userType
            phone
        }
    }
`;

export const PROJECTS = gql`
    query {
        list_projects {
            _id
            projectName
            description
            startDate
            endDate
            totalAssignedUser
            users {
                _id
                username
                email
                userType
            }
            createdBy {
                _id
                userName
                email
            }
        }
    }
`;

export const USER_BY_ID = gql`
    query ($id: String!) {
        findUserById(id: $id) {
            _id
            name
            username
            companyName
            email
            phone
            userType
        }
    }
`;

export const PROJECT_BY_ID = gql`
    query ($id: String!) {
        getThisProject(id: $id) {
            _id
            projectName
            description
            startDate
            endDate
            users {
                _id
                name
                username
                companyName
                email
                phone
                userType
            }
        }
    }
`;

export const REMOVE_PROJECT = gql`
    query ($id: String!) {
        removeProject {
            _id
            projectName
            description
            startDate
            endDate
            users
        }
    }
`;



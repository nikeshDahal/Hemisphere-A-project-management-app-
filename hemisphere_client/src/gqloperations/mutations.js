import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
    mutation ($projectName: String!, $description: String!, $startDate: DateTime!, $endDate: DateTime!, $users: [ID!]!) {
        createProject(
            createProjectInput: {
                projectName: $projectName
                description: $description
                startDate: $startDate
                endDate: $endDate
                users: $users
            }
        ) {
            _id
            projectName
            description
            startDate
            endDate
            users {
                _id
                username
                email
                userType
            }
            createdBy {
                _id
                userName
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation (
        $name: String!
        $username: String!
        $email: String!
        $password: String!
        $phone: Float!
        $companyName: String!
        $userType: UserType!
    ) {
        create_application_user(
            createUserInput: {
                name: $name
                username: $username
                email: $email
                password: $password
                phone: $phone
                companyName: $companyName
                userType: $userType
            }
        ) {
            _id
            name
            username
            email
            phone
            companyName
            userType
        }
    }
`;

export const UPDATE_USER = gql`
    mutation (
        $_id: ID!
        $password: String!
        $companyName: String!
        $email: String!
        $name: String!
        $username: String!
        $phone: Float!
        $userType: UserType!
    ) {
        updateUser(
            updateUserInput: {
                _id: $_id
                companyName: $companyName
                email: $email
                name: $name
                phone: $phone
                username: $username
                userType: $userType
                password: $password
            }
        ) {
            companyName
            email
            name
            phone
            username
            userType
        }
    }
`;

export const UPDATE_PROJECT = gql`
    mutation ($_id: String!, $projectName: String!, $description: String!, $startDate: DateTime!, $endDate: DateTime!, $users: [ID!]!) {
        updateProject(
            updateProjectInput: {
                _id: $_id
                projectName: $projectName
                description: $description
                startDate: $startDate
                endDate: $endDate
                users: $users
            }
        ) {
            _id
            projectName
            description
            startDate
            endDate
            users {
                _id
                userType
                username
            }
        }
    }
`;

export const REMOVE_PROJECT = gql`
    mutation ($id: String!) {
        removeProject(id: $id) {
            _id
            projectName
            description
            startDate
            endDate
            
        }
    }
`;

export const REMOVE_USER = gql`
    mutation ($id: String!) {
        removeUser(id: $id) {
            name
            username
            companyName
            email
            phone
            userType
        }
    }
`;

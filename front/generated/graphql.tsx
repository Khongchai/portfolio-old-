import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  projects: Array<ProjectEntity>;
  technologies: Array<TechnologyEntity>;
};

export type ProjectEntity = {
  __typename?: 'ProjectEntity';
  id: Scalars['Float'];
  startDate: Scalars['Float'];
  endDate: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  technologiesUsed?: Maybe<Array<TechnologyEntity>>;
};

export type TechnologyEntity = {
  __typename?: 'TechnologyEntity';
  id: Scalars['Float'];
  title: Scalars['String'];
  usedIn?: Maybe<Array<ProjectEntity>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<ProjectEntity>;
  addTechnologies?: Maybe<ProjResponse>;
  deleteProject: Scalars['Boolean'];
  deleteAllProjects: Scalars['String'];
  createTechnology?: Maybe<TechnologyEntity>;
  deleteAllTechnologies: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  projectData: ProjectCreationInput;
};


export type MutationAddTechnologiesArgs = {
  projectData: AddTechInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Float'];
};


export type MutationCreateTechnologyArgs = {
  projectName?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type ProjectCreationInput = {
  startDate: Scalars['Float'];
  endDate: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  technologiesNames: Array<Scalars['String']>;
};

export type ProjResponse = {
  __typename?: 'ProjResponse';
  errors?: Maybe<Array<ErrorField>>;
  proj?: Maybe<ProjectEntity>;
};

export type ErrorField = {
  __typename?: 'ErrorField';
  message: Scalars['String'];
};

export type AddTechInput = {
  projName: Scalars['String'];
  technologiesNames: Array<Scalars['String']>;
};

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Array<(
    { __typename?: 'ProjectEntity' }
    & Pick<ProjectEntity, 'id' | 'title' | 'startDate' | 'endDate' | 'description'>
    & { technologiesUsed?: Maybe<Array<(
      { __typename?: 'TechnologyEntity' }
      & Pick<TechnologyEntity, 'title'>
    )>> }
  )> }
);

export type TechnologiesQueryVariables = Exact<{ [key: string]: never; }>;


export type TechnologiesQuery = (
  { __typename?: 'Query' }
  & { technologies: Array<(
    { __typename?: 'TechnologyEntity' }
    & Pick<TechnologyEntity, 'id' | 'title'>
    & { usedIn?: Maybe<Array<(
      { __typename?: 'ProjectEntity' }
      & Pick<ProjectEntity, 'id'>
    )>> }
  )> }
);


export const ProjectsDocument = gql`
    query Projects {
  projects {
    id
    title
    startDate
    endDate
    description
    technologiesUsed {
      title
    }
  }
}
    `;

export function useProjectsQuery(options: Omit<Urql.UseQueryArgs<ProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectsQuery>({ query: ProjectsDocument, ...options });
};
export const TechnologiesDocument = gql`
    query Technologies {
  technologies {
    id
    title
    usedIn {
      id
    }
  }
}
    `;

export function useTechnologiesQuery(options: Omit<Urql.UseQueryArgs<TechnologiesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TechnologiesQuery>({ query: TechnologiesDocument, ...options });
};
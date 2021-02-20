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
  title: Scalars['String'];
  description: Scalars['String'];
  frontEndTechnologies?: Maybe<Array<TechnologyEntity>>;
  backEndTechnologies?: Maybe<Array<TechnologyEntity>>;
  languages?: Maybe<Array<TechnologyEntity>>;
  hostingServices?: Maybe<Array<TechnologyEntity>>;
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  isHighlight?: Maybe<Scalars['Boolean']>;
};

export type TechnologyEntity = {
  __typename?: 'TechnologyEntity';
  id: Scalars['Float'];
  title: Scalars['String'];
  frontEndIn?: Maybe<Array<ProjectEntity>>;
  backEndIn?: Maybe<Array<ProjectEntity>>;
  languageOf?: Maybe<Array<ProjectEntity>>;
  hosting?: Maybe<Array<ProjectEntity>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<ProjectEntity>;
  addOrRemoveTechnologies?: Maybe<ProjResponse>;
  setProjectHighlight: ProjResponse;
  deleteAllProjects: Scalars['String'];
  deleteProject: Scalars['Boolean'];
  createTechnology?: Maybe<TechnologyEntity>;
  deleteAllTechnologies: Scalars['String'];
  deleteTechnolgy: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  projectData: ProjectCreationInput;
};


export type MutationAddOrRemoveTechnologiesArgs = {
  operation: Scalars['Boolean'];
  projectData: AddTechInput;
};


export type MutationSetProjectHighlightArgs = {
  operation: Scalars['Boolean'];
  title: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Float'];
};


export type MutationCreateTechnologyArgs = {
  projectName?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};


export type MutationDeleteTechnolgyArgs = {
  title: Scalars['String'];
};

export type ProjectCreationInput = {
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  techProps?: Maybe<TechnologyProperties>;
  isHighlight?: Maybe<Scalars['Boolean']>;
};

export type TechnologyProperties = {
  frontEndNames?: Maybe<Array<Scalars['String']>>;
  backEndNames?: Maybe<Array<Scalars['String']>>;
  languagesNames?: Maybe<Array<Scalars['String']>>;
  hostingServiceNames?: Maybe<Array<Scalars['String']>>;
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
  techProps?: Maybe<TechnologyProperties>;
};

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Array<(
    { __typename?: 'ProjectEntity' }
    & Pick<ProjectEntity, 'title' | 'isHighlight' | 'endDate' | 'startDate' | 'description' | 'id'>
    & { frontEndTechnologies?: Maybe<Array<(
      { __typename?: 'TechnologyEntity' }
      & Pick<TechnologyEntity, 'title' | 'id'>
    )>>, backEndTechnologies?: Maybe<Array<(
      { __typename?: 'TechnologyEntity' }
      & Pick<TechnologyEntity, 'title' | 'id'>
    )>>, languages?: Maybe<Array<(
      { __typename?: 'TechnologyEntity' }
      & Pick<TechnologyEntity, 'title' | 'id'>
    )>>, hostingServices?: Maybe<Array<(
      { __typename?: 'TechnologyEntity' }
      & Pick<TechnologyEntity, 'title' | 'id'>
    )>> }
  )> }
);

export type TechnologiesQueryVariables = Exact<{ [key: string]: never; }>;


export type TechnologiesQuery = (
  { __typename?: 'Query' }
  & { technologies: Array<(
    { __typename?: 'TechnologyEntity' }
    & Pick<TechnologyEntity, 'id' | 'title'>
    & { frontEndIn?: Maybe<Array<(
      { __typename?: 'ProjectEntity' }
      & Pick<ProjectEntity, 'title' | 'id'>
    )>>, backEndIn?: Maybe<Array<(
      { __typename?: 'ProjectEntity' }
      & Pick<ProjectEntity, 'title' | 'id'>
    )>>, languageOf?: Maybe<Array<(
      { __typename?: 'ProjectEntity' }
      & Pick<ProjectEntity, 'title' | 'id'>
    )>>, hosting?: Maybe<Array<(
      { __typename?: 'ProjectEntity' }
      & Pick<ProjectEntity, 'title' | 'id'>
    )>> }
  )> }
);


export const ProjectsDocument = gql`
    query Projects {
  projects {
    title
    frontEndTechnologies {
      title
      id
    }
    backEndTechnologies {
      title
      id
    }
    languages {
      title
      id
    }
    hostingServices {
      title
      id
    }
    isHighlight
    endDate
    startDate
    description
    id
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
    frontEndIn {
      title
      id
    }
    backEndIn {
      title
      id
    }
    languageOf {
      title
      id
    }
    hosting {
      title
      id
    }
  }
}
    `;

export function useTechnologiesQuery(options: Omit<Urql.UseQueryArgs<TechnologiesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TechnologiesQuery>({ query: TechnologiesDocument, ...options });
};
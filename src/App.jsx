import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

const USERS_QUERY = gql`
  query {
    users {
      id
      email
      username
    }
  }
`;
const USERID_QUERY = gql`
  query {
    user(id: "66623d7496bf62449819fb2d") {
      id
      username
      email
    }
  }
`;
const REGISTER_MUTATION = gql`
  mutation {
    register(username: "pablo12", email: "pablo12@email.com", password: "asdasdasd") {
      id
      username
      email
    }
  }
`;
const LOGIN_MUTATION = gql`
  mutation {
    login(email: "pablo12@email.com", password: "qweq12weqwe") {
      id
      username
      email
    }
  }
`;
const SETS_QUERY = gql`
  query {
    sets {
      id
      name
      creator
      words
    }
  }
`;
const SETID_QUERY = gql`
  query {
    set(id: "66690ac2748b7160ebcfc037") {
      creator
      name
      words
    }
  }
`;
const CREATESET_MUTATION = gql`
  mutation {
    createSet(name: "distribuida vocabulary", creator: "diego@email.com", words: ["microservice", "query", "graphql"]) {
      name
      words
    }
  }
`;
const WORD_QUERY = gql`
  query {
    word(word: "car") {
      word
      meanings {
        definitions {
          definition
        }
        synonyms
      }
    }
  }
`;

const App = () => {
  const [currentQuery, setCurrentQuery] = useState(null);
  const [currentResult, setCurrentResult] = useState(null);

  const [fetchUsers, { data: usersData }] = useLazyQuery(USERS_QUERY);
  const [fetchUserId, { data: userData }] = useLazyQuery(USERID_QUERY);
  const [fetchRegister, { data: registerData }] = useMutation(REGISTER_MUTATION);
  const [fetchLogin, { data: loginData }] = useMutation(LOGIN_MUTATION);
  const [fetchSets, { data: setsData }] = useLazyQuery(SETS_QUERY);
  const [fetchSetId, { data: setData }] = useLazyQuery(SETID_QUERY);
  const [fetchCreateSet, { data: createSetData }] = useMutation(CREATESET_MUTATION);
  const [fetchWord, { data: wordData }] = useLazyQuery(WORD_QUERY);

  useEffect(() => {
    if (currentQuery === 'users' && usersData) {
      console.log(usersData.users);
      setCurrentResult(usersData.users);
    }
    if (currentQuery === 'userId' && userData) {
      console.log(userData.user);
      setCurrentResult(userData.user);
    }
    if (currentQuery === 'register' && registerData) {
      console.log(registerData.register);
      setCurrentResult(registerData.register);
    }
    if (currentQuery === 'login' && loginData) {
      console.log(loginData.login);
      setCurrentResult(loginData.login);
    }
    if (currentQuery === 'sets' && setsData) {
      console.log(setsData.sets);
      setCurrentResult(setsData.sets);
    }
    if (currentQuery === 'setId' && setData) {
      console.log(setData.set);
      setCurrentResult(setData.set);
    }
    if (currentQuery === 'createSet' && createSetData) {
      console.log(createSetData.createSet);
      setCurrentResult(createSetData.createSet);
    }
    if (currentQuery === 'word' && wordData) {
      console.log(wordData.word);
      setCurrentResult(wordData.word);
    }
  }, [currentQuery, usersData, userData, registerData, loginData, setsData, setData, createSetData, wordData]);

  return (
    <>
      <div>
        <h2>User getAll</h2>
        <button onClick={() => { setCurrentQuery('users'); fetchUsers(); }}>Send request</button>
      </div>
      <div>
        <h2>User by Id</h2>
        <button onClick={() => { setCurrentQuery('userId'); fetchUserId(); }}>Send request</button>
      </div>
      <div>
        <h2>Register</h2>
        <button onClick={() => { setCurrentQuery('register'); fetchRegister(); }}>Send request</button>
      </div>
      <div>
        <h2>Login</h2>
        <button onClick={() => { setCurrentQuery('login'); fetchLogin(); }}>Send request</button>
      </div>

      <div>
        <h2>Sets getAll</h2>
        <button onClick={() => { setCurrentQuery('sets'); fetchSets(); }}>Send request</button>
      </div>
      <div>
        <h2>Set by Id</h2>
        <button onClick={() => { setCurrentQuery('setId'); fetchSetId(); }}>Send request</button>
      </div>
      <div>
        <h2>Create set</h2>
        <button onClick={() => { setCurrentQuery('createSet'); fetchCreateSet(); }}>Send request</button>
      </div>
      
      <div>
        <h2>Word</h2>
        <button onClick={() => { setCurrentQuery('word'); fetchWord(); }}>Send request</button>
      </div>

      <p>
        { JSON.stringify(currentResult) }
      </p>
    </>
  );
};

export default App;

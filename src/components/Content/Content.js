import React, { useEffect, useCallback, useState } from "react";
import { connect } from "react-redux";
import { getUsers, postUser } from "../../redux/actions/actions";

const Content = ({ data, getUsers, postUser }) => {
	const getUsersCallback = useCallback(() => getUsers(), [getUsers]);

  useEffect(() => {
    getUsersCallback();
	}, [getUsersCallback]);

	const [newAge, setNewAge] = useState();
	const [newName, setNewName] = useState();
	const [newEmail, setNewEmail] = useState();
	const [newPassword, setNewPassword] = useState();
	
	const addUser = () => {
		const newUser = {
			age: newAge,
			name: newName,
			email: newEmail,
			password: newPassword
		};
		postUser(newUser)
	};

	const submitChanges = e => {
    addUser();
    e.preventDefault();
  };

  return (
    <div>
      <h1>Content</h1>

			<form onSubmit={submitChanges}>
				<input type="text" defaultValue="" placeholder="age" onChange={e => setNewAge(e.target.value)} />
				<input type="text" defaultValue="" placeholder="name" onChange={e => setNewName(e.target.value)} />
				<input type="text" defaultValue="" placeholder="email" onChange={e => setNewEmail(e.target.value)} />
				<input type="text" defaultValue="" placeholder="password" onChange={e => setNewPassword(e.target.value)} />

				<input type="submit" value="add" />
			</form>

      {data.map(user => (
				<div key={user._id}>
					<p>name: {user.name}</p>
					<p>age: {user.age}</p>
				</div>
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

export default connect(mapStateToProps, { getUsers, postUser })(Content);

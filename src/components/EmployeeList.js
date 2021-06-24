import Table from 'react-bootstrap/Table'

import { Component } from "react";
import API from "../utils/API";

class EmployeeList extends Component {
    state = {
        results: [],
        filteredResultes: []
    };

    componentDidMount() {
        fetch("https://randomuser.me/api/?results=6")
            .then(res => res.json())
            .then(
                (res) => {
                    console.log(res.results)
                    this.setState({
                        isLoaded: true,
                        results: res.results
                    }, () => {
                    
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
    }

    sortUser() {
        let sortedUsers = this.state.results;
        sortedUsers.sort(function (a, b) {
            var textA = a.name.last.toUpperCase();
            var textB = b.name.last.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }); this.setState({
            results: sortedUsers

        })
    }

    filterUser = (event) => {
        var filterKey = event.target.value
        let filterUsers = this.state.results;

        filterUsers = filterUsers.filter(function (a) {
            return a.name.first.toUpperCase().includes(filterKey.toUpperCase())
        })
        console.log(filterUsers);

        this.setState({
            results: filterUsers
        })
    }

    render() {
        const { error, isLoaded, results } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <container>
                        <button onClick={() => this.sortUser()}>A-Z</button>
                        <button onClick={() => this.sortUser()}>Z-A</button>
                    </container>
                    <input type="text" id="myInput" onChange={this.filterUser} placeholder="Search for last names.." />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Gender</th>
                                <th>DOB</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(result => (<tr>
                                <td><img src={result.picture.thumbnail} alt="image"></img></td>
                                <td>{result.name.last}</td>
                                <td>{result.name.first}</td>
                                <td>{result.gender}</td>
                                <td>{result.dob.date}</td>
                                <td>{result.location.city}</td>
                            </tr>)
                            )}

                        </tbody>
                    </Table>
                </div>)
        }
    }
}

export default EmployeeList
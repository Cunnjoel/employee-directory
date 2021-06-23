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
                    // this.sortUser()
                    this.filterUser()
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

    sortUser(){
        let sortedUsers = this.state.results;
        sortedUsers.sort(function(a, b) {
            var textA = a.name.last.toUpperCase();
            var textB = b.name.last.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }); this.setState({
            results: sortedUsers

        })
    }

    filterUser(filterKey){
        var filterKey = ""
        let filterUsers = this.state.results;
        
        filterUsers = filterUsers.filter(function(a) {
            console.log(a.name.lastt)
            console.log(a.name.last.toUpperCase().includes(filterKey))
            return a.name.first.toUpperCase().includes(filterKey)
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
        }else {
            return (
            <div>
            <input type="text" />
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
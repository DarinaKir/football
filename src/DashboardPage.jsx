import {useEffect, useState} from 'react';
import PropTypes from "prop-types";

const DashboardPage = ({data}) => {
    const [matchInLive, setMatchInLive] = useState(null)
    // const [counter, setCounter] = useState(0)

    useEffect(() => {
        if (data != null) {
            const filterData = data.filter((game) => {
                return game.isLive
            })
            setMatchInLive(filterData);
            // setCounter(counter+1);
        }
    }, [data]);

    return (
        <div className='container'>
            <h2>Steams Live Games</h2>
                {
                    (matchInLive !=null && matchInLive.length !== 0) ?
                        <div>
                            <table className='table'>
                                <thead>
                                <tr>
                                    <th>Team1</th>
                                    <th>Goals</th>
                                    <th>Goals</th>
                                    <th>Team2</th>
                                </tr>
                                </thead>
                                <tbody>
                                {matchInLive.map((match, index) => (
                                    <tr key={index}>
                                        <td>{match.team1.name}</td>
                                        <td>{match.goals_T1}</td>
                                        <td>{match.goals_T2}</td>
                                        <td>{match.team2.name}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {/*<div>{counter}</div>*/}
                        </div>

                        :
                        <div className='text'>
                            <div>
                                No match in live
                            </div>
                        </div>
                }

        </div>
    );
};
DashboardPage.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};
export default DashboardPage;

import React, {useState, useEffect} from 'react'
import express from '../../apis/express'

import LoanItem from './LoanItem'

const Loans = ({session, setShowLoans}) => {

  const [loansList, setLoansList] = useState([])
  const { id } = session ? session.user : ""

  useEffect(() => {
    const refreshLoans = async () => {
      if(session) {
        const { data } = await express.get(`/items/loans/${id}`)
        setLoansList(data)
        console.log(data)
      }
    }
    refreshLoans()
  }, [id, session])

  const getLoans = async () => {
    if(session) {
      const { data } = await express.get(`/items/loans/${id}`)
      setLoansList(data)
     
    }
  }

  const renderedLoansList = loansList.map(loanItem => {
    return (
      <LoanItem 
        key={loanItem._id} 
        loanItem={loanItem}
        session={session}
        getLoans={getLoans}
      />
    )
  })

  return (
    <div>
      <div className='ui content'>
        <h2 className="ui header">
          <i className="blue gift icon"></i>
          <div className="content">
            Loans
            <div className="sub header">Manage lending and pending requests</div>
          </div>
            <button onClick={() => setShowLoans(false)} class="ui right floated primary basic button">View Lending</button>
        </h2>
      </div>
      <div className="ui one cards main-item-list">
        {renderedLoansList}
      </div>
    </div>
  )
}


export default Loans
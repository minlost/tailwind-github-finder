import React from 'react'
import PropTypes from 'prop-types'
import RepoItem from './RepoItem'

function RepoList({repos}) {
  return (
    <div className='rounded-lg shadow-lg card-bg-base-100'>RepoList
        <div className="card-body">
            <h2 className="text3xl my4 font-bold card-title">
                Latest Reposotories 
            </h2>
            {repos.map((repos) => (
                <RepoItem key={repos.id} repo={repos} /> 
                
            ))}
        </div>
    </div>
  )
}

RepoList.propTypes = {
    repos: PropTypes.array.isRequired
}

export default RepoList
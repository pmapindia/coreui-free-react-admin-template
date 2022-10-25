import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
//HERE WE ARE DECLARING THE CHILDREN ROUTES EX.BSE/BREADCRUMS
//FOR LARGE SET OF ROUTES INSTEAD OF WRITING ROUTES COMPONENT THOUSAND TIMES YOU CAN CREATE A SEPARATE OBJECT 
//AND YOU CAN ITERATE THROUGH THE OBJECT
// routes config
// import routes from '../routes'
import productionroutes from '../productionroutes'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      {/* <route.component {...props} /> */}
                      <productionroutes.component {...props} />

                    </CFade>
                  )} />
              )
            })}
            <Redirect from="/" to="/productiondashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)

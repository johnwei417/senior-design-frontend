import React        from 'react';
import { Link }     from 'react-router-dom';
import Class         from 'service/class-service.jsx';
import MUtil        from 'util/mm.jsx'
const _mm           = new MUtil();
const _class         = new Class();


import PageTitle    from 'component/page-title/index.jsx';
import './index.scss'

class ClassDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userID:              _mm.getStorage('userInfo').id,
            classID:             this.props.match.params.classID,
            api_token:           _mm.getStorage('userInfo').api_token,
            role:                _mm.getStorage('userInfo').role,
            p_count:             _mm.getStorage('classInfo').scores.proficient.count || 0,
            ap_count:            _mm.getStorage('classInfo').scores.almostProficient.count || 0,
            np_count:            _mm.getStorage('classInfo').scores.notProficient.count || 0
        }
    }

    componentDidMount(){
        this.checkLogin();
        this.loadClassDetail();
    }


    checkLogin(){
        if(localStorage.getItem("userInfo") === null){
        window.location.href = '/login';
        }
    }

    loadClassDetail(){
        let classInfo = {};
        classInfo.api_token = this.state.api_token;
        classInfo.userID = this.state.userID;
        classInfo.classID = this.state.classID;
        
        _class.getClassDetails(classInfo).then((res)=>{
            _mm.setStorage('classInfo', res.classroom);
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        });

    }

    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="Students Performance" />

                <div className="row">
                    <div className="col-md-4">
                        <Link to={`/classroom/${this.state.classID}/p`}  className="color-box brown">
                            <p className="count">{this.state.p_count}</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>Proficient</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to={`/classroom/${this.state.classID}/ap`} className="color-box green">
                            <p className="count">{this.state.ap_count}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>Almost Proficient</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to={`/classroom/${this.state.classID}/np`} className="color-box blue">
                            <p className="count">{this.state.np_count}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>Non-Proficient</span>
                            </p>
                        </Link>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default ClassDetail;
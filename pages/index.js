import React,{ useEffect, useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import axios from 'axios';
import bike from '../public/bike.json';
import bike_extra from '../public/bike_extra.json';
import damas from '../public/damas.json';
import rabo from '../public/rabo.json';
import ton1 from '../public/ton1.json';
import ton1_4 from '../public/ton1_4.json';
import ton2_5 from '../public/ton2_5.json';
import ton3_5 from '../public/ton3_5.json';
import ton5 from '../public/ton5.json';
import ton8 from '../public/ton8.json';
import ton11 from '../public/ton11.json';
import ton14 from '../public/ton14.json';
import ton15 from '../public/ton15.json';
import ton18 from '../public/ton18.json';
import ton25 from '../public/ton25.json';
import Anime from 'react-anime';
// const {anime} = Anime;

export default function Home() {

  const [ startPoint , setStartPoint ] = useState({ x: 0, y: 0});
  const [ endPoint , setEndPoint] = useState({ x: 0, y: 0});
  const [ startAddr , setStartAddr ] = useState('');
  const [ endAddr , setEndAddr ] = useState('');
  const [ pointDistance , setPointDistance ] = useState(0);
  const [ price, setPrice ] = useState(0);
  const [ distanceResult , setDistanceResult ] = useState(0);
  const [ freight , setFreight ] = useState('bike');
  const [ realMoney , setRealMoney ] = useState(0);
  const [ totalPrice , setTotalPrice ] = useState(0);
  const [ bikeExtra , setBikeExtra ] = useState(0);
  const [ addrList , setAddrList ] = useState([])
  const [ startOrEnd , setStartOrEnd ] = useState('')
  const [ searchAddr , setSearchAddr ] = useState('')
  const [ addrPage , setAddrPage ] = useState(0)
  const [ displayPrice , setDisplayPrice ] = useState('0')
  let battery = 0

function insertAddr(addrObject){
  if(startOrEnd === 'start'){
    setStartAddr(addrObject.address_name)
    setStartPoint({ x: addrObject.x, y: addrObject.y })
    closeBtn()
  } else {
    setEndAddr(addrObject.address_name)
    setEndPoint({ x: addrObject.x, y: addrObject.y })
    closeBtn()
  }

}

function openAddr(point){
  if(process.browser){
    const Place = new kakao.maps.services.Places()
    if(point === 'sp'){
      setStartAddr(data.address)
      Place.keywordSearch('개봉동',function(result,statusKey){
        if (statusKey === kakao.maps.services.Status.OK) {
          console.log(resultKey);  
        }
      })

    } else if(point ==='ep') {  
      setEndAddr(data.address)
    }
  }
}

  async function selectAddr (addr,startOrEnd){
    setSearchAddr(addr)
    const Geocoder = new kakao.maps.services.Geocoder()
    const Place = new kakao.maps.services.Places()
    setStartOrEnd(startOrEnd)
    let resultPoint = {}
    return new Promise((resolve,reject) => {
      Place.keywordSearch(addr,function(result,status){
        if (status == kakao.maps.services.Status.OK) {
          resultPoint = { x : result[0].x , y : result[0].y}
          setAddrList([...result])
          resolve(result)
        }
      })
    }).then(()=>{
      document.querySelector('.startPop').style.display = 'block'
    })

  }

  function closeBtn () {
    document.querySelector('.eContainer .modal').style.display = 'none'
  }

  async function getDistanceSearch () {
    await axios.get(`https://255jbj6dya.execute-api.ap-northeast-2.amazonaws.com/kakkaomap?epx=${endPoint.x}&epy=${endPoint.y}&spx=${startPoint.x}&spy=${startPoint.y}`)
    .then(({data})=>{
      
      let displacement = Number(data)
      let resultDistance = Math.floor(displacement / 1000 )
      if(resultDistance <= 1){
        resultDistance = 1
      }

      switch(freight){
        case 'bike':
          let startBigaddr = ''
          let endBigaddr = ''
            if(startAddr.indexOf('경기') > -1){
              startBigaddr = JSON.parse(JSON.stringify(startAddr))
              startBigaddr = startBigaddr.replace('경기 ','').split(' ')[0]
            } else {
              startBigaddr = JSON.parse(JSON.stringify(startAddr))
              startBigaddr = startBigaddr.split(' ')[0]
            }
  
            if(endAddr.indexOf('경기') > -1){
              endBigaddr = JSON.parse(JSON.stringify(endAddr))
              endBigaddr = endBigaddr.replace('경기 ','').split(' ')[0]
            } else {
              endBigaddr = JSON.parse(JSON.stringify(endAddr))
              endBigaddr = endBigaddr.split(' ')[0]
            }
            //실금
              setRealMoney(bike[resultDistance]) 
            if(startBigaddr === endBigaddr){
              setTotalPrice(bike[resultDistance])
              setBikeExtra(0)
            } else {
              let extraBike = 0
              extraBike = bike[resultDistance]+bike_extra[resultDistance]
              setBikeExtra(bike_extra[resultDistance])
              setTotalPrice(extraBike)
            }
        break;

        case 'damas':
        //   // 모든차량   10만원이하는 천단위(백원단위 내림) 예) 57,800원도 57000원   
        //   // 오토바이,다마스,라보,1톤   10만원 이상은 5천원단위 예)128,000원도 125,000원   내림
        //   // 그외 모든차량 10만원 이상은 만원 단위 예) 158,000원도 15만원 내림
          setPrice(damas[resultDistance])
          if(price >= 100000){
            if(Math.floor(Math.floor(price) % 10000) >= 5000 ){
              setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) + 5000 ) 
            } else {
              setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) ) 
            }
          } else {  
            setTotalPrice( (Math.floor( Math.floor(price) / 1000)* 1000 ) )
          }
          break;
        case 'rabo':
          setPrice(rabo[resultDistance])
          setRealMoney(rabo[resultDistance]) 
          break;
        case 'ton1':
          setPrice(ton1[resultDistance])
          setRealMoney(ton1[resultDistance])
          break;
        case 'ton1_4':
          setPrice(ton1_4[resultDistance])
          setRealMoney(ton1_4[resultDistance])
          break;
        case 'ton2_5':
          setPrice(ton2_5[resultDistance])
          setRealMoney(ton2_5[resultDistance])
          break;
        case 'ton3_5':
          setPrice(ton3_5[resultDistance])
          setRealMoney(ton3_5[resultDistance])
          break;
        case 'ton5':
          setPrice(ton5[resultDistance])
          setRealMoney(ton5[resultDistance])
          break;
        case 'ton8':
          setPrice(ton8[resultDistance])
          setRealMoney(ton8[resultDistance])
          break;
        case 'ton11':
          setPrice(ton11[resultDistance])
          setRealMoney(ton11[resultDistance])
          break;
        case 'ton14':
          setPrice(ton14[resultDistance])
          setRealMoney(ton14[resultDistance])
          break;
        case 'ton15':
          setPrice(ton15[resultDistance])
          setRealMoney(ton15[resultDistance])
          break;
        case 'ton18':
          setPrice(ton18[resultDistance])
          setRealMoney(ton18[resultDistance])
          break;
        break;
        case 'ton25':
          setPrice(ton25[resultDistance])
          setRealMoney(ton25[resultDistance])
          break;
        case '':
          break;
      }

    })
    console.log(totalPrice)
    displayCountPrice(totalPrice)

  }

  async function displayCountPrice(totalPrice){
    const intervalPrice = (totalPrice, interval) => {
      let flag = true;
      let displayMoney = totalPrice / 1000
      const tick = () => {
        setTimeout(() => {
          // console.log({ flag })
          console.log('x')
          if (!flag) {
            setDisplayPrice((totalPrice/1000)+',000')
            return;
          }
          
          // callback()
          console.log(displayMoney)
          displayMoney = (displayMoney+1)
          setDisplayPrice(displayMoney+',000')
          tick()
        }, interval)
      };
      
      tick();
      
      return () => { flag = false };
    }

      console.log('x')
      const stopper = intervalPrice(totalPrice,10)
      setTimeout(()=>{
        stopper()
      },1000)
      
    
  }
  

  async function selectType(e){
    setFreight(e.target.value)
  }

  useEffect(()=>{
    
  },[pointDistance])
  
  //1st

  // useEffect(()=>{
    
    
  // },[distanceResult,freight])

  //2nd

  useEffect(()=>{
    switch(freight){
    case 'bike':

    break;
    case 'damas':
    //   // 모든차량   10만원이하는 천단위(백원단위 내림) 예) 57,800원도 57000원   
    //   // 오토바이,다마스,라보,1톤   10만원 이상은 5천원단위 예)128,000원도 125,000원   내림
    //   // 그외 모든차량 10만원 이상은 만원 단위 예) 158,000원도 15만원 내림
    setRealMoney(damas[distanceResult])
      
      break;
    case 'rabo':
      if(price >= 100000){
        if(Math.floor(Math.floor(price) % 10000) >= 5000 ){
          setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) + 5000 ) 
        } else {
          setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) ) 
        }
      } else {  
        setTotalPrice( (Math.floor( Math.floor(price) / 1000)* 1000 ) )
      }
      break;
    case 'ton1':
      if(price >= 100000){
        if(Math.floor(Math.floor(price) % 10000) >= 5000 ){
          console.log('+5000')
          setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) + 5000 ) 
        } else {
          console.log('-5000')
          setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) ) 
        }
      } else {  
        console.log('low 100000')
        setTotalPrice( (Math.floor( Math.floor(price) / 1000)* 1000 ) )
      }
      break;
    case 'ton1_4':
      if(price >= 100000){
        setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) ) 
      } else {  
        setTotalPrice( (Math.floor( Math.floor(price) / 1000)* 1000 ) )
      }
      break;
    case 'ton2_5':
      if(price >= 100000){
        setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) ) 
      } else {  
        setTotalPrice( (Math.floor( Math.floor(price) / 1000)* 1000 ) )
      }
      break;
    case 'ton3_5':
      if(price >= 100000){
        setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) ) 
      } else {  
        setTotalPrice( (Math.floor( Math.floor(price) / 1000)* 1000 ) )
      }
      break;
    case 'ton5':
      if(price >= 100000){
        setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) ) 
      } else {  
        setTotalPrice( (Math.floor( Math.floor(price) / 1000)* 1000 ) )
      }
      break;
    case 'ton8':
      if(price >= 100000){
        setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) ) 
      } else {  
        setTotalPrice( (Math.floor( Math.floor(price) / 1000)* 1000 ) )
      }
      break;
    case 'ton11':
      if(price >= 100000){
        setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) ) 
      } else {  
        setTotalPrice( (Math.floor( Math.floor(price) / 1000)* 1000 ) )
      }
      break;
    case 'ton14':
      if(price >= 100000){
        setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) ) 
      } else {  
        setTotalPrice( (Math.floor( Math.floor(price) / 1000)* 1000 ) )
      }
      break;
    case 'ton15':
      if(price >= 100000){
        setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) ) 
      } else {  
        setTotalPrice( (Math.floor( Math.floor(price) / 1000)* 1000 ) )
      }
      break;
    case 'ton18':
      if(price >= 100000){
        setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) ) 
      } else {  
        setTotalPrice( (Math.floor( Math.floor(price) / 1000)* 1000 ) )
      }
      break;
    case 'ton25':
      if(price >= 100000){
        setTotalPrice( (Math.floor( Math.floor(price) / 10000)* 10000 ) ) 
      } else {  
        setTotalPrice( (Math.floor( Math.floor(price) / 1000)* 1000 ) )
      }
      break;
    case '':
      break;

    }
  },[price])


  return (
    <div>
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=47b11c2b5c42cf0ea68d8c3b12aac812&libraries=services"></script>
    <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>  

    <div className="eContainer">    
    <div className="wrap">
        <h2>퀵서비스 요금조회</h2>
        <div className="feeSearch">
            <div className="eInputArea eInputArea01">
                <input type="text" placeholder="출발지주소 / 건물명을 입력하세요" value={startAddr} onKeyDown={(e)=>{ if(e.keyCode === 13){selectAddr(startAddr,'start')} }} onChange={(e)=>{setStartAddr(e.target.value)}} />
                <button className="sBtn sBtn01" onClick={()=>selectAddr(startAddr,'start')}></button>
            </div>
            
            <div className="eInputArea eInputArea02">
                <input type="text" placeholder="도착지주소 / 건물명을 입력하세요" value={endAddr} onKeyDown={(e)=>{ if(e.keyCode === 13){selectAddr(endAddr,'end')} }} onChange={(e)=>{setEndAddr(e.target.value)}}  />
                <button className="sBtn sBtn02" onClick={()=>selectAddr(endAddr,'end')}></button>
            </div>
            <div className="eSelectArea">
                <span>
                    <select onChange={(e)=>selectType(e)}>
                      <option value='bike'>오토바이</option>
                      <option value='damas'>다마스</option>
                      <option value='rabo'>라보</option>
                      <option value='ton1'>1톤</option>
                      <option value='ton1_4'>1.4톤</option>
                      <option value='ton2_5'>2.5톤</option>
                      <option value='ton3_5'>3.5톤</option>
                      <option value='ton5'>5톤</option>
                      <option value='ton8'>8톤</option>
                      <option value='ton11'>11톤</option>
                      <option value='ton14'>14톤</option>
                      <option value='ton15'>15톤</option>
                      <option value='ton18'>18톤</option>
                      <option value='ton25'>25톤</option>
                    </select>
                </span>
                <span>
                    <button onClick={()=>getDistanceSearch()}>요금조회</button>
                </span>
            </div>
            {/* <Anime */
                // initial={[
                //   {
                //     targets: '.totalFee',
                //     charged: totalPrice,
                //     cycles: 130,
                //     round: 1,
                //     easing: 'linear',
                //     update: function() {
                //       document.querySelector('.totalFee').innerHTML = 
                //       logEl.innerHTML = JSON.stringify(battery);
                //     }
                //   }
                //  ]}
                // delay={anime.stagger(100)}
                // scale={[.1, .9]}
                // target={0}
                // // charged={'100%'}
                // // cycles={130}
                // easing={'linear'}
                // round={1}
                // update={ function() {
                //   battery += parseInt(totalPrice/60)
                //   // totalPrice - 61
                //   console.log(battery)
                //   document.querySelector('.totalFee').innerHTML = battery.toLocaleString()+'원'
                // }}
              // >
            }
                
            <div className="totalFee">
                { displayPrice }원
            </div>
                
            
        </div>
        <div className="using"><span>콜킴</span> 이용중</div>
        <div className="mPerson">
          <img src="mperson.png" />
        </div>
    </div>
    
    <div className="modal startPop">
        <div className="modal_bg"></div>
        <div className="modal-content">   
            
            <div className="popTop">
                <div className="popWrap">
                    <input type="text" placeholder="주소 검색하기" value={startOrEnd === 'start' ? startAddr : endAddr } onKeyDown={(e)=>{ if(e.code === 'Enter'){console.log(e.code);selectAddr(startAddr,'start')} }} onChange={(e)=>{setStartAddr(e.target.value)}} />
                </div>
                <div className="closeBtn" onClick={ ()=> closeBtn()} ><img src="eClose.png" /></div>
            </div>
             <div className="popList">
                <div className="popWrap">
                    <ul>
                    { addrList.map((v)=>{
                        return <>
                        { v.road_address_name === '' ? '' :
                        <li style={{ cursor : 'pointer' }} onClick={ ()=>insertAddr(v,'start') }>
                            <div className="popAddress">{ v.address_name } &nbsp;(&nbsp;{ v.place_name }&nbsp;)</div>
                            <div className="popAddDesc"> <span className="square">도로명</span>{ v.road_address_name }</div>
                        </li>
                        }
                    </>
                    })}
                    </ul>
                </div>
            </div>   
        </div>
    </div>
    
    <div className="modal arrivalPop">
        <div className="modal_bg"></div>
        <div className="modal-content">   
            <div className="popTop">
                <div className="popWrap">
                    <input type="text" placeholder="주소 검색하기" />
                </div>
                <div className="closeBtn"><img src="eClose.png" /></div>
            </div>
             <div className="popList">
                <div className="popWrap">
                    <ul>
                        <li>
                            <div className="popAddress">서울특별시 구로구 고척로21나길 8-9 (개봉동) 도착</div>
                            <div className="popAddDesc"><span className="square">지번</span>서울특별시 구로구 개봉동 7-18</div>
                        </li>
                        <li>
                            <div className="popAddress">서울특별시 구로구 고척로21나길 8-9 (개봉동)</div>
                            <div className="popAddDesc"><span className="square">지번</span>서울특별시 구로구 개봉동 7-18</div>
                        </li>
                        <li>
                            <div className="popAddress">서울특별시 구로구 고척로21나길 8-9 (개봉동)</div>
                            <div className="popAddDesc"><span className="square">지번</span>서울특별시 구로구 개봉동 7-18</div>
                        </li><li>
                            <div className="popAddress">서울특별시 구로구 고척로21나길 8-9 (개봉동)</div>
                            <div className="popAddDesc"><span className="square">지번</span>서울특별시 구로구 개봉동 7-18</div>
                        </li>
                        <li>
                            <div className="popAddress">서울특별시 구로구 고척로21나길 8-9 (개봉동)</div>
                            <div className="popAddDesc"><span className="square">지번</span>서울특별시 구로구 개봉동 7-18</div>
                        </li>
                        <li>
                            <div className="popAddress">서울특별시 구로구 고척로21나길 8-9 (개봉동)</div>
                            <div className="popAddDesc"><span className="square">지번</span>서울특별시 구로구 개봉동 7-18</div>
                        </li>
                        <li>
                            <div className="popAddress">서울특별시 구로구 고척로21나길 8-9 (개봉동)</div>
                            <div className="popAddDesc"><span className="square">지번</span>서울특별시 구로구 개봉동 7-18</div>
                        </li>
                        <li>
                            <div className="popAddress">서울특별시 구로구 고척로21나길 8-9 (개봉동)</div>
                            <div className="popAddDesc"><span className="square">지번</span>서울특별시 구로구 개봉동 7-18</div>
                        </li>
                    </ul>
                </div>
            </div>   
        </div>
    </div>
</div>


        {/* <div className='leftSide' style={{ width: '50%', flex : 1, flexDirection : 'col', justifyContent : 'center', justifyItems : 'center', border: 'solid 1px #000000', height: '1024px' }}>
          <div style={{ flex : 1 , textAlign: 'center', fontSize : '24px'}}>퀵 서비스 요금 조회</div>
          <input type='text' style={{ width : '240px' , height : '45px'}} /><br/>
          <input type='text' style={{ width : '240px' , height : '45px'}} />
          <select onChange={(e)=>selectType(e)}>
              <option value=''>--선택--</option>
              <option value='bike'>오토바이</option>
              <option value='damas'>다마스</option>
              <option value='rabo'>라보</option>
              <option value='ton1'>1톤</option>
              <option value='ton1_4'>1.4톤</option>
              <option value='ton2_5'>2.5톤</option>
              <option value='ton3_5'>3.5톤</option>
              <option value='ton5'>5톤</option>
              <option value='ton8'>8톤</option>
              <option value='ton11'>11톤</option>
              <option value='ton14'>14톤</option>
              <option value='ton15'>15톤</option>
              <option value='ton18'>18톤</option>
              <option value='ton25'>25톤</option>
          </select>
          <button>요금조회</button><br/>
        </div> */}
        
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const { query } = ctx;
  return { query };
};
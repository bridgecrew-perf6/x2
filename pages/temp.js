<div>
                화물선택
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
                </select><br/>
                출발지<input type='text' value={startAddr} onKeyDown={(e)=>{ if(e.keyCode == 13){selectAddr(startAddr,'start')} }} onChange={(e)=>{setStartAddr(e.target.value)}} /><button onClick={()=>selectAddr(startAddr,'start')}>검색</button><br/>
                도착지<input type='text' value={endAddr} onKeyDown={(e)=>{ if(e.keyCode == 13){selectAddr(endAddr,'end')} }} onChange={(e)=>{setEndAddr(e.target.value)}} /><button onClick={()=>selectAddr(endAddr,'end')}>검색</button><br/>
                {/* 좌표 : { startPoint.x },{ startPoint.y } , { endPoint.x },{ endPoint.y }<br/> */}
                거리 : { pointDistance / 1000 }<br/>
                {/* 실금 : <span style={{ 'color' : 'red' }}>{ realMoney }</span><br/> */}
                { freight === 'bike' ? <>
                  추가요금(오토바이) :{ bikeExtra }<br/>
                  </> : '' }
                비용 : { totalPrice }<br/>
                <button onClick={()=>getDistanceSearch()}>검색</button><br/>
                <div className='list' style={{ width : '80%' , height : '500px', border: '1px solid #000000' }}>
                  { addrList.map((v)=>{
                    return  <>
                      <div>=============================</div>
                      <div style={{ cursor : 'pointer' }} onClick={ ()=>insertAddr(v,'start') }>
                        <div>{ v.address_name }</div>
                        <div>{ v.road_address_name } </div>
                        <div>{ v.place_name }</div>
                      </div>
                    </>
                  })}
            </div>
        </div>
import React,{useEffect,useState} from 'react';
import './queen.css';
import useWebAnimations from '@wellyshen/use-web-animations'

function Queen(){
  const [ playing, setPlaying ] = useState(false);
    let queenRate=1;
    let sceneryRate=0;
    let objects=[{
        transform:"translateX(100%)",
        transform:"translateX(-100%)",
    }]
    const refQueen=useWebAnimations({
        keyframes:[
            {transform:"translateY(0)"},
            {transform:"translateY(-100%)"}
          ],
          timing:{
            duration:600,
            iterations:Infinity,
            easing:"steps(7, end)",
            playbackRate:queenRate,
          }
    });
    const refFG1=useWebAnimations({
        autoPlay:playing,
        keyframes:objects,
        timing:{
        duration:6000,
        iterations:Infinity,
        playbackRate: sceneryRate,
        }
    });
    const  refFG2=useWebAnimations({
        autoPlay:playing,
        keyframes:objects,
        timing:{
        duration:12000,
        iterations:Infinity,
        playbackRate: sceneryRate,
        }
    });
    const refBG1=useWebAnimations({
        autoPlay:playing,
        keyframes:objects,
        timing:{
        duration:36000,
        iterations:Infinity,
        playbackRate: sceneryRate,
        }
    });
    const refBG2=useWebAnimations({
        autoPlay:playing,
        keyframes:objects,
        timing:{
        duration:12000,
        iterations:Infinity,
        playbackRate: sceneryRate,
        }
    });
    let sceneries = [refFG1,refFG2,refBG1,refBG2,];
    let adjustBackgroundPlayback = function () {
      refQueen.playbackRate = queenRate;
      const dynamicQueenRate = refQueen.playbackRate;
      if(dynamicQueenRate<0.8){
        sceneryRate=(dynamicQueenRate/2)*-1;
      }
      else if(dynamicQueenRate>1.2){
        sceneryRate=(dynamicQueenRate/2);
      }
      else{
        sceneryRate=0;
      };
      sceneries.forEach((rate)=>{
        rate.playbackRate=sceneryRate;
      })
    };
    
	useEffect(() => {

		refFG1.getAnimation().currentTime =refFG1.getAnimation().effect.getTiming().duration / 2;
    refFG2.getAnimation().currentTime =refFG2.getAnimation().effect.getTiming().duration / 2;
		refBG1.getAnimation().currentTime =refBG1.getAnimation().effect.getTiming().duration / 2;
		refBG1.getAnimation().currentTime =refBG1.getAnimation().effect.getTiming().duration / 2;

		adjustBackgroundPlayback();

		setInterval(()=>{
			const queenAnimation = refQueen.getAnimation();
			if (queenAnimation.playbackRate > .4) {
				const newPlayback = queenAnimation.playbackRate * .9;
				queenAnimation.updatePlaybackRate(newPlayback);
        adjustBackgroundPlayback();
			} 
		}, 2000);
	},[])
  function faster() {
    // sceneries.forEach((play)=>{
    //   play.autoPlay=true;
    // })
    setPlaying(true);
		const queenAnimation = refQueen.getAnimation();
		const newPlayback = queenAnimation.playbackRate * 1.1;
		queenAnimation.updatePlaybackRate(newPlayback);
		adjustBackgroundPlayback();
    
	}
    return<div className='body' onClick={faster}>
        <div class="container" >
            <div class="sky"></div>
            <div class="earth">
                <div id="red-queen_and_alice">
                <img ref={refQueen.ref}  id="red-queen_and_alice_sprite" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" alt="Alice and the Red Queen running to stay in place."/>
                </div>
            </div>
            <div ref={refFG1.ref} class="scenery" id="foreground1">
                <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt=" "/>
            </div>
            <div ref={refFG2.ref} class="scenery" id="foreground2">    
                <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt=" "/>
                <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt=" "/>
            </div>
            <div ref={refBG1.ref} class="scenery" id="background1">
                <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt=" "/>
                <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt=" "/>
                <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt=" "/>
            </div>
            <div ref={refBG2.ref} class="scenery" id="background2">
                <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt=" "/>
                <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt=" "/>
                <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt=" "/>
            </div>
        </div>
    </div>
}
export default Queen;
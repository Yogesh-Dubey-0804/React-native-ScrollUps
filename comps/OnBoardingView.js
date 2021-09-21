import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image, View,StatusBar } from 'react-native';
import { AuthContext } from './utils';

 const OnBoarding = (props)=>{
    
  const {OnBoarded}= React.useContext(AuthContext)

const Navigate = () =>{
  props.navigation.navigate("Loginpage")
}


  


return(
 <View style = {{flex:1}}>
   <StatusBar
   hidden={true}/>
<Onboarding 
   onDone={Navigate}
  pages={[
    {
      
      backgroundColor: 'black',
      image: <Image source={{uri:'https://static.wikia.nocookie.net/dark-netflix/images/f/fd/Dark_Title_Screen.jpg/revision/latest?cb=20171111233324'}}
            style={{
                height:"55%",
                width:"60%",
                borderRadius:800,
                marginBottom:0
            }} />,
      
      title: 'AyeVidsLives',
      subtitle: 'Best choices for relaxing your mood & meeting !',
      
    },
    {
        backgroundColor: 'black',
        image: <Image source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAAFICAMAAACfoBe1AAAAmVBMVEUAAABCQkInJyc1NTUiIiIaGhpNTU1iYmIvLy8yMjIWFhY+Pj5QUFBGRkZaWloeHh4RERF6enoNDQ1xcXFeXl5VVVVvb2+CgoIrKytqamo/Pz+Li4tKSkqYmJiRkZGAgICxsbGnp6eWlpapqanHx8e2trZtbmqSk4zMy8ba2dSfnpm/v784OTZfYFt9fX84ODv9/vfu7uzV1dSClOrVAAAJHUlEQVR4nO2ai3LbNhaGDwGQIAneAJAEwasoWe02Tp1t3v/h9kBy7LRJm51pJe3Mni8zMuXQ9D84wH8uMgBBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARB/B/DVBY/WsN3EN7aaMhKmTSPlvI7mFtcerkyZrBTwR+s541oX7rXyzoWApXO/qGCvtDt2/ubJseFwxe2buZxkq6Uu/1yacCwPEdtSR5WzkaP1AXwMr1d1iZIMrGBLFMqBdk/UBek0/h2beamaqCBXIhcQVZFxSOltfqLrPCSClWXvgYjYIZoEFDND1PWta/CFKtLYaCxekskoOmOPI1UZvVf//ztkK+LMgiVV7OevCnTWbmI4Tk1CkAnSj3mJNjk+jVvB4iMlzxqdaTK3UUmTdF58fB2dWJ7K++tTHdvlxWHtlSQduBjtA6UirpikQaLm3k5lfdVNlevF7Fre5f0KLQGlQ8wW1dGXgRzS4HHiVz8faUNb1EaKg9LPYTLohbQcbuWbd82WT6MGXTQOeXv6SLm/ewp4Jkfgns0Gb7jGFaQRxZxGHLGcjXH6H53PKqevV3GBWDgjKnNUEMjc1wh2eH5HGM8urloQSS6dXfL9vXXv0my4B81B9FAArIBldQOasZ5KvAQx8A9pHfbbr/fO1VhfdGC4QI4imlGGHdbaZbWQVEkyzuG8ztrkJcOGjyWKe4sSKoSzDRDura4/frRdd95yG2ogm3lLHvfcJBXWXht0P0FXMNti3SWUw1R0vl7bbXY4nbHsie5xrVGZwW5zVJ2YIJAKK53NROHtC3Y7qN7SetKTN/4db7GlYFJQeiWt9UGOURQpK83YoChLaC6XzGOxSPHkApXX95mohZYPoIpVul9kUH79c2lr6rpXqU4esE1ZM18ESFYSJnYDZhSxPFRwx+qtPudAbAGcnfRlJcSspSHxWMc0wJGkOvmnlr+gIZhc6GHykImHcAeC1noPZgrm/yai+qHj7gRg4e8a6XfOwFRj+WkTbWbjHS46V0Bucke1oImuM8KW7UQPD4KB7LyWisYtE4qhyWketiqtbinhslyWNHDBnwDLIVjJOI07WFNeZ77R/XGGh22iWYOUQtl9JpNg99jC2UgrlmT373ifmVtpIAFD6KUeCLlxUaAtR4U4/UMqsY3+WOkTdjRnYqay7DbpbcLFj7CbsDisea+jtRYxu0Pn3ITJKah5YWb4QVNTNo8FLx22MBUebtukxolqC798XNuQCi2J45V/xptWUiTnR+THhvjzAeRblklZ485pLg+TRQmQfAiY2zrTIoaMa8z9do58VPe58UjpK1oGaYM0wQX+k0TGwGZjOrhvZjVoLl4gLRjLAbsUUL/O4SRsgpTK9yCpXu7hfUf9SMMZB1HJkzMrtNarM0M5vPC1Mev7nF+/in59kflyr795j+I7wYs/0M9O5u8BgdiRG2L+/oe5quff+V/TAq9H7W6pbT5Mh8Nv6KOAHOCxbYzeR+aXimMqIru99ps6PD1Lbs+g0WuCdUZy7mCtJk32JdvsmZwj7z86gMEs17v8XK4nbYJu4HKVHFTQcVyD255i1L2JlFc6snyLWNJ3dljC87WfDudDzcau2nO5rpoLEQd2sR8eN9lg3rfSvzibEXosBquV+sSVlit/b5OS+dudBxGtC2wUBTgIziu++u30cgwfnMtoms3o2bsF2DW2nqsOA2W6Ka2Q8YlBzn9+dP/HgseBb5kazE/resXj1ClgYwlDCIegVyKBaphCouYWaed9NWnETfCIAqs1U83y2PSrucXPyd+zkNDcPV9PHmlUGFUn0N1KA+7h14dS1jDCqnTvh82PSGn1VX6Zp9g1Yd3ByhZxsOR4wOTvsZW2RjJYJK1jhLwfRS13g5mP/zrlw8///Sh43k09/Z0K2WYEN69ohRowKwbeVGKYBVCSWNAbEpAp+VZJoUGyZ3+aNdIrssR/7lxuZ20AoM0qqu+BIPKoUzF8GoUl6mHm4TCzlk+VYWDpt+nQwM68c9aYsi3W1aaZ5gbuJSLCQ+Kgk0Zdu3aZ9FU0+G0mgTDq9bFPjN4Wednm7d6+tTZdT7dsq3xTl38NVforA0LH/2gpiZRMW+4ytdukpWGpGSRLfcnLKOmRRzxXPqzj8Tz8YfP/zuc0DOiLMsijE/awRwqbkxevOJYJ6lEVlnmK/wfNutY2X1K7SErpnOkzxt/uqky6MK0iJd+Dh9doMViCRIWruQQ/HbUXaQGGca6APveV37rinMEsfu4/Xy+9fj0wDkTIFo2J8MomrqAJDT20UVhgs1Dmhg9q0TgDqz5VEbT05OEyv562n/47L/Lc1GIJhNlamchE4zlJX3OrcxDfZnuCR4N29WS8WxoEzdE1bS8rO75l9s3W/KAQjrcYwKjGEYMYfg3t1Wt0FVKJXcpBPdLOrcGk1i6aNTmYbM/3VwZHjofkvniZBrJCoJfAUsjHhdh5JGl2DpnOfCDhDwtSmBn/kkelun24Qyc+PLs1lSvYJkUlwKxU3yOctA9Jq8iGExSupOFuBNl9yTafnu601+nYD/gT2LkE5+/1Gk1x8TUreMePoLZfDmkkemXLYVh0Mu8fL5be2r7y591gA0voRMwfZgfTSdMXGjLvD/iJowr2enjsu9PH/59x6FgK1FbLQ45CMk7414+7+sila4zOWtV8dRpdD0uPdaT+vjb9uMn/nOUW4N9TGin8Fy646YzWLvO97AuXR4aHL64RFWaVfvTb3eeH/GdwWEafHvs2ud+TrA7dcvpCZcwtXYSDHxil8Udnj//kt1XGXLUIA7uUE1a8hSbvwHqulirFCPpp1XtewZ5Ic/nuwtDtkMxJj3YxXEQHOtvjO08zkPCG7foE1hd6fODRs9iOXRYcBxlXUNTY3dSob5S8abmri+O6XReHyPsgl6muQ1poAnVx2Xyl2BpUqR5uyw3a+3+S7idzl6xmqEiLDe4SDnvJ9T1nYnRAxjspC/41kuri0eM//6KOmX/W3/GSRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRDEA/gPVoOJqV+ux6UAAAAASUVORK5CYII='}}
              style={{
                  height:"60%",
                  width:"50%",
                  borderRadius:800,
                }} />,
        
        title: 'Application For you',
        subtitle:"Integrating world's best technologies!"      
      }
    ]}
/>
</View>
);
 };

 export default OnBoarding;
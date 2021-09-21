import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, Image , TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore';
export default function ChatScreen({route}) {


  const userAvatar = route.params.userAvatar
  const userName = route.params.userName
  const id = route.params.id

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
      <View style = {styles.MainContainer}>
        <Image
         source = {{uri:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQUExYUExQXFxYYGRsZGRkZGRgZGxkbGBkYGBggGRkbHikhGSAmHhgYIjIiJiosLy8vGCA1OjUuOSkuLywBCgoKDg0OHBAQHC4nISYuLi8uMC4uLjAuLi4uLi4uMC4uLi4wLi4uLi4uLi4uLi4wLi4uLi4uLi4uLi4uLi4uLv/AABEIASwAqAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAECBQAGB//EAEQQAAIAAwUFBAcGBAQGAwAAAAECAAMRBBIhMUEFUWFxgSKRobEGEzJCwdHwFFJicoLhB5Ki8SMzQ7IVU2OTwtIWNKP/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAtEQACAgIBAgQFBAMBAAAAAAAAAQIRAyExEkEEE1FhFCIygfAFcaGxkcHh8f/aAAwDAQACEQMRAD8A+SWm2s2AwH1mYWAg1os927jWuB56fGAswEaWkZU2asmSq5DrANpZA7orKtYCiue6IlpMmmiqW4DTmdOsJJyY24xQleJyFOfyhlLUQoA01jasfo2c5r0/CufVjB9pybOktlAUOaUqascRqcY3Xh5V1S0cr8ZByUYb/Y8001jmTG5I9F2Iq0xV5Vb5Rh0hqft+b7IoKCm8wQeOP1oeZZZUsTr1s3pfo7JHtO55UUeRPjBhsqyj3Sebt8DHjpm05rZu3TDygDT2OZJ5kxfxGNcRMvg8z+rI/sbfpBLQTAJahVujAb6n9o70eRGmf4ihlunA76inxjNlewvXzik89nqPjGfmfN119jby309F+1nt/sNmPuL4jyMDbYVnOQI5MfjWPCLOYZEjkTB0t80ZTG7zGvxUHzBHP8DlX05Geqm+iyH2JjD8wDeVI8w6UJANaEiu+HrDtqcTdLVFCTUY0CkmlKboRpGeSWOX0KjbDDLC1klfoWZGK1IJXeQad8DRRXM03Zx6zZVulBRKJAZahgcO1U1zzxg9p2RJmY3aHeuH7GKXh+qNxZk/G9E3GcWjEs89SKA9Ii1zaKd5wi1r2Cy4obw3ZH5GMucrey1QRvwI74wnilF7OzHmhkXysqVjorLDVAz4/OOhWXQ/bhVaQgqUxzO+NGxWB5xrkurHyA1gu2rNLlhVQ9sZjMnid3LjFrE+nqZk88evpXP9fuLbHko8wLMrQg60xGOJ3UrG3aduyZIuSwGpouC9T/ePMUhRlxpFLK8aqK+5EvDxyyuTdenY07ft2bMPtXRuWo8c4zA+IPGsFl2YnPDz7obs1ivMFlo0xzkqgsx5KoxjFylJ2zoUIY1UVSIdKEjcYC9mLGuFI2fSDZ0yTNCzEKMyS3KnMXlFa/qDR6f0I9FLLaZLTrTPeWVmFLisi1AVWrVgSa3tN0auDlpHNLxEcceuT0eAFi3t3CLfZUGbHwEfZk2ZsWR/pCYfxF38GN3ugi+kmzZX+XZZa8pcpfEAxS8LLucr/Vov6It/n3Pjs6WAsumRUkfzuPhAzLUihNMd4H1nHofTzbcu02m+ihAEVAK7izE5D73hGx/Dr0plWaVMV5Ycu4ataUAUCnsnj3wvLt9Nm7zyjj8zpf7fueD+yocmPeDHHZ40fvH7x9qPphYpgpNs6EcVR/8Acoijf8GnYNZ0Tiqer8ZRrDfhZdmc6/Vkvqg1+fY+OSLOZauxIxAUU3sQT/SrDrFrEBfBOIWrkbwgLkdaU6x6X+IFhskp5a2Mkqyl2qxahJuqBexGTZ74W9FPRq0WpZzSFU3AqkM12t4lqKSKE9gZkZxn0OPy9ztWeMoLI9L3PIMxJqczDNl2jMl+y5A3ZjuMbO19hzJJpaJDyzvIoCeDDst0JjJmbPOaGvA4H5RnuLOj5MkezX+TbsXpODhMWnEYjqM/OFtvW1XZQhBUDMak/IU8YwxKNaEEQwY386co9LOb4bHCfXFBJElmJCgkgVwjo0tk22XLYo+DGlW0B3HdT5xMVGEZK7IyZcsZVGOiNqbdwuScFGF7L+UaDjHnw5rXWIRSTQQ9ZrLiAAWYkAAAk1OQUDEmMJTlN2zqhjhjjSOpGhsbY0+0vckSy7akZL+Zjgo86Rs7a9D58iypPnLdJa6y1qVVhVC1MAa1FOK8oX9D/Sh7E0y5SkxQprjQqSVIG/Fh1jTpVpSOZ5m4OWKm1o9psv8AhlIkqJlung/9NSVXkW9pv0hY1Z3pbZLIpl2SSijeAFB4kDFuZNY+dbU9I3mkszlid5rGLNtBOZje8ePg8/4bPnd5ZfY1PTXbj2maswqLwW5hhgCSuH6jGTYrU6A0NK6QF5yjWKfaa+yCekYynvqs9KGFKCx1pDzWtzrA2mk6wqfWHhECQ597uhdcmHlQXDQw9nrnTviqimAiv2V957jFDZSPeI6RKcr4LajVWNS2bSLGdMG+FVlOuvfEO8znD65C8uDItF9jWsek9FvSKbZVuy3K1N5gMiaAYg4HACPNpONe0sM9g63YccnTKycmHzIdElo+tbM/iGri5OlqwOB0rzBwPhFrV6J7OtgvWZ/UTDotAteMo4fyER8gWaQcDWHZG2ZiZRv1wmvmR53wWTE7wyoY9LdjPZJvqJjI5ADVSuRqBUH2TgcOUZdjlE3npW4Kgb2PsDwJ5KYpbLe86YXmMWdjiTiTQADuAA6R9M2R6ByrRYpYlTgLQtXcZreanZYZ4ABQwwzONY51DqvpO+edYVHzXt/n+D5E9amta61z6x0em27sOZJf1dollH0OYYb1bJh89DHRl0s7IzUlaYtsTY8y0TFkyULO3QAas591R9VJx+s7L2PZdlJ6xyJtpIz3V0Qe4v4sz4DN9GvSOzWawJ9nT/HcUm1xIdcCWOo1VcgDzr4nbW2GmMWZizHE11jrxwjBdTPFzzzeIm8a1Fc+r/4anpV6VTbQHV2ojCl0eyNRhqQQDXPCPErLAxJqYJOm6kwuqluUZ5Z9TO/w+COKFLSCvaAMsTFQjNnhF7qp84LIn1GAjN75N1rjRT7OqirePyg1mdDXhFCtcCY56KOz4QcewqT2tjDTB7ohezlg1TSkDlzWJHZw4wxNnYUqB1goP3pBjaYVnS3JrWg5QNZTHG9hwAhlrYMqjvg44QJ3y/4GRaRxha1z8MFr0xhZr5NQVI5w5Lu0F7OCkt7C29WiLNJDLU1Bik/Z/wBZQN56hqA06wRi7LgesGw0u1CRksMjXnDaOpADDLCsWsSYEOQSYvPsVcu75GEyldeoq6AMCKH61je2Nt15bAqxUjcY800tlyxG6GpUsMopg31TlGkMjgY5sEcqpn2Wwbes9vleotirU5NljkCD7jcRh5RMfI7Jb2Q46R0dPVjls8iXg88HWNujOkTmqSDQRSdNjmmAZRMtNTnHG/Q9xVd0RLlZFugg6zBpAmW9yiTgKLC7D7/mghUax0wk+zFUl1xY1O7QQCeTWhOG4Q3oUdssXAOLFjwyhmW1QDSkIXqZYQxInC7jpBCWxzhoEwOrGKhF4xzVJNATjEiQ27xERTZdpDsgC6KQqVWuXjBEvAAVXvgf2duHfFy2kZwpNtsj1K7zD6y7qqK1wrXniPAiEDKce6fODi0gcwNYUNPY8nzKkRaHIYhlqBhXlxg9mti0oMOGUKrOixRWzFDvET1epXSlwEnz8cRhvg15iuBwikqVQBc4vZ7WDl3Ro1SM003ZFjlVBvU6RWdKZMoqLQCxpgYNOtlFxEJjXp3FGnljRsCI6LPKvAN4xEFMOdgZaU7R6RdGLcBHHHCJbcIQ3z7kGZXBf7RBfRerfKLtKwoOvGBEwSbQRSZeSaGn1WItAx4wJVJPLWCKT7vVjAuKBr5rRT1WrGnnF0A91epiUpnnxOUTUNvPgIENstcY5tTgIqssVp2jx0izVGoUcBWKGeKUxMAL2CtIXQE9THSpAOYK9Y5EAF7hXMwNpoO8cjA9Eq3wXmSwvvEeMXutTRhFpGIwJPOODsDSgPI5dIfYT52AKrqCp45RF0qQTiN4xhkoa4kEbiIh5RHsGnAwaHZ32gaZkd2+F5kkHEYGLlQ2l1t2kDBINDEzu7KhSVIlGBIDChGRyrD7qGGkLotaEjLKKziPZOBMVTqyXJXS4GpDilI6FpCtrprvjoVDv2FyxAG/WN7YiSZMlrVMmKZquFlSQULMSDV3VkcXBpUCpHKMywWMzGa7dAVSxLsEUKuZqc9wAqTXAQLaNs9a5a5Ll1AF2WgRRQUy37ySTBdD6bRWXM3wJgMTp58ooq15DOCVy8BBdrYqp6OJ35aKPjE10pU7tBziAePM/ARQzKZfXOCx0XnGlKip8IDfJPw/aDvVsxlp8zpB7LY2Y3VBJ1AwoN7HQfmIgq3oLSVsDOYtQZczj3DGKCTz7qeZjUkWNAxWdNEoD7q+sJI0AQgdS1OMOCXYAvtWp2+8ElS17qufGK6bezPzUlq/8GERQUNac1iPU/m7gfIxtbOl2Qg+vmT0avZKIrrSnvBmBz3QxaNjWf1bTJVtRwMLjS2RySMAFNQeJDYQdDYvOSfdfZmBKYrhgedVPjAixBxrGnadmTZaK7y3EtxVWIYKwOVCeyeVYSuY0FBX69k/CE12LjNPaJkm/gdO/vghl4UJr5iBUunDD/afiIHfIOOcF0gq2NKoIzrx1gLj3W/Swi8nE1Geo0P7xKoMdRXLcYBexQTSuBGPgYq4vCh5xdh7p6GAg0wiZWXCglmnH2TmPGOiPV1IOVNY6HTFKSToLNkFKKwobqsAaZMKqeoMKzE3REyYSSxNSdYsHNK9BzMFpoKcXo4gZaDE8THeevARIFOniYo507+cDGthJlLop0jpcv8Av8vn3REmX9fWp8oYmNcw1Gm7hz8st9Wl3JbrSLrLVRUkVx7I04sdM9DXyiC4NBUU0AoB3QuhYmoBN3HK8KDeKUI59Y05dy0sqKkuTNIpW8Vlu2nZKkIxyFCFruhp3wS1W3/4KS1z7Pcc+eEUxriuG8H6rFbTLdGKPeR1JDKagqRmCIKJ6BQDeDb9D008ILCu5WaUGRFeWPU0ipAz/fxPzESSCB4ftu6UPOCJa3RCi+ycSPiae0OMA1/I/svb8+QCJbm4falt25bD8SNUdadYdmmVbJiy5EiTZy2JLOQGe7khJIlqTWijUip3eekVfsopJ3KCe6mXlEqaZd2WPwMNS9eDOWJJ9S0/zkNb7I8lyk1GR1NGU5jmPeHGF2ApTTcPNflHpF9IJc6SJdqlvNdKepdWCPQVvI7kElcqChIxoRGLtGztLcq8syyDUoQwKVxGDY5EZ6QSiuUOE3xJU/zgWkTQox5gjWORqmoz1G8fOOcDpmeH4h8YCoINNYltmiinfqHZa4aZqdxgc3KtMRnygpBBxyPgYoz4143WgrsJPuWMwUwjoAVoaR0LrZSxxoEYLl+nHrHFcRHL5mp6QkqG3ZymmeQz5mOcAmo/udIq/wC/fBJCfXP9vOHzoT1sL7Irr9VP18BEW+7eUgVUqrU7WZUBxjj7QbpSJnqTUg4DCmu8VHIeMRtE4ShjVUAIP4iZikEaFXHKG+BRW0KF8arhu/vrBHlUUElSDuYEjmtaiBtMqALoFMKjAnnjTwgkiTevdpRQVoxu11wJwrwrEGlG9LmvapEy87NNlAPRgvalKLrFWu3ryYEgmhWv3YwSfr5QTZ1qMuYrAsADjcYq133gGGIqMIe9JpTJaJiO7TLpojMbxaWe1LJP5WU9Ypu1Zml0uu3KE1tlEuXEph2rovYZdrOID1x6/v8AMQvXhx+cNT7aHCgS5aU1RSK/mxxgspotJtbyq3CVrgaEjyzECE2px/v++sUr9cDDNjtglgi4jHeyKx6XsBBZNIoJlDUdeI38xHsCPt9m0Nqs6ihqKzZNQKEnNkJqN4JEeLV9RzHxEHsoUsL1aV0pUqeYNDnFxl2MssLqS00dOklWutSvBlYcRVSR0rFA1DXcP6T8jGz6WbMWRPuyyTKdVmSmNKlHFVrxBqvSMXjpn0PtCBrpZUJKUVJdyROvGh6c44UOO/A84DdoaQVgRX+annEJt8mjSXBRsuWEdEtmeIr1joKBMGsd8qd8TTAxJ+MJDfJ0xRF0agrSu4c8vCAiHbClSAAScgBn0GuFf7Q1sTVLYRLKGe6ppeNSW90AEsTwUAnkIT2hNDuWAoCBhuAUAAcAAAOWucaM9rlUpWoo5xAxIIUfepgSdTQDKrZc8ECtNfqv1vgkENuwRmEqBQYHOgr1OZ6xMiVeNKqMNSBXkThWLTGJoToKfH4iL2W6pJdL60IoGumuhrQ1pupElti0b+35jqkhS7TBMko/bCsymrJRXIvAD1YAAOWEYAjd22GUSkdlciRLK1UqyLMUzQtVNGperVs70NcMmX1Ixb0O7O9WQyMkxiRUXCvZK41oVxwqM9YRHyglnBrUEAjeaeJw8YRR37iIAqRpFpzVZidTU04muBEDb4wxDMySq+zMD41wDCneMYorYjgfOFgcekGrAmJo9LtDakqfZpEt76zJPrFvBVIZSwZRUuCLproc4wmwPCvg0eo2EobZ9sFBVfUuDTHszLpx5PHkVOB+siY1n2ZzYa3FcJ/3sKsy7nup1GEcXqQekDc+fmBEqYz6nwb9KqySco6KkecdBoGmFmS6V5Dzjipr1HjEyBUkHcfnFzv33G+BiSxcyiM+PlDMit1heIBrUDC8BTBjhhwqB3CBmcxa6cq0+EXcNdFDQ78dRU5CumkNCfuXmzFqLxGNBmcN1dR4cN8LiWyk1Iy0xBGQNN2QG+GHlqaEqCwGJFKE6YZV5npAps0ACpNd2p8qbqnoBANAWHECuGO+n795gQksK1+t5grSg4vBuBFMuCgZxJXgcqU+HTUwhhdmbPedNSUlKu1ATkK6ngFBJ4Axfats9a7zDdLGi1WoUBVCLdU4gXVGcaEtWs0u+SitPR1UGvrAjEBnGihwGQE+7epnWMZkuigORx4sch9cYb0qM07lfbhf7AXfrlFAYNMAAJGmHU5x0pyTQgYY1hGpUiIJ84IRTj7x+ER6qtKbq98Mkgzq4UHcvnSsd8oj1JWpMEZM6cAPOADb2Jap6SbQJcsPLZAswkHsqWUgghhQ3gBrGPMWhypmY9ds4er2ZamP+rMkyh+ktNbwUR5EL2a8B/USfKNJqkkc2GXVKTrvX7kU37/hEsBTDhHTvifCgiZK5cT5CsR7G9ashvjHRYLlxMdALZ0hqMPrPCCy1yB/Eh8xBjYRTM+EUZq46sKj86QqLuxSecQ28A9dfEGHEWoNOJH+4eBoIvZ5iqCWGHtKaVwbMdD5wKROBNVqKHDfiSV8bw6rAuRS2igDMud1hkc6jmKsIrL9i61G3Ag1HKmPlDYs6EMWcKfdBQsGrX3hlTLLrB5tms6jCdNYkZCSqoCd5aaT3L1iuli617/4M7lllge/LAchUmNKZYFkJftDXXahlygAzEYEGataS5dMlPaauVImbtG6l2RJlpVaPMYGa530ZxcQHcoHMxmHEgkDDUfFsl8YNIn5pey/kLtGe012nOxZ2xJNAF0GGgAAAUZUEAunMZeQObMd8WCbxgcdT3A4ueJFIWNpofZqK4hsSTxiWaJUqRxnrX2QV0goRcgCKip4DTvi/qlNGVCGzuk4czuHdWLAFgKGuPEFyNfyiAdgV0BGeJ4KMqwtNJqSRT6wg9onEdmtTWrHju40hoFvVh3VSrVunCpKmlLukHIcC0rQNjgWPDd9cYJJltUdSeZyH1vixUkCo4tTfmq8zhywjX9GZUtpyi0MFQNfmHgBeuimpAA6iKhG3Rlln0xcg21bC1nSVJmTqh0Wd6rtUVpgoKihAYgdxEYeAINMCS36UFFh3bu0HtNomTWFGdjdX7uFAOSoAK8oTNDrUU/oQ/8Ak1IqbV6JxRair5fJIst7WlKDLMnE+Jirpcw+6CerYD4QCS7FsGIqamhPMwzevUr7xLH8q4DyiNM02nsi7Sv4R4mOijthXVzXoP38o6CwpnWma4Yi+aZimGByyiLOxOA9qt5eYzHUeUSykqV95PEa90Kq9DUZiJLHq4ZdnFgPwnCYvMZ9IVBuNjiPNTqPA8xDV+tCMLxqv4ZgzB4H4wayXCwvKNQtfdbVSPEQ6FdHS6NgSMcjoCcQeRA6fpgTp92gOVGxx56RRrSt4hcBoThjXEcBXGuh6w1LAYgVCk4VbAbqPupv05UJtb0ZyuOwQksRW6t4aGg/lPzpA5IZjR1ZdzXb1OZap7jB1S6SrVB3ZgfMcjAjOINCpPEEkdwoYTQ02BNlcNUTAeIJYnoK+MMuKkVALDMgAt3CqrzJjrW11QWDEHIg1X+omh6RWzzRMF0EBtA9SDuwFF8IXGirvZW7n2QQeJK83c+1yELz7QATdxORY4YblHuiLPLnBqtUXciaBRyr2e6G59GALoC2rYqveaE8hCGAlFHU3kpTC8vkN54YxaWpU0oAQDdB90as5iZlAQccMiRT/ty8+phuwbLee4lykLuxrcGPV24bshFJN8Eykoq29Atn2F3dFRSzMeyKdp2bCpGnD+8bm3ZkmzhLLKRJk1SWnzTXBzmqMD7KAYk1qSYs9LG59TalaaEKzWUeyWFHEtyKGmVVoR3x5pVocBXUBsC1Mi25Rnxi/pVdznS82VvhccombMLFjlUa5qlcTzbdELZy4IGGVensr0GJ4mBTZl3EmpOP5j978o0GucUsMxgSwYgDFta8KakxF72dFOtBkspWqtQE9aKPaPXLviUNaDK+aDgi/P5xZyTevGlaM/4V91RxjghJ/E4y+4n1hBQX6i1pm3mJGWQ5COhyZs0aMRzxjonpY1OJSUbwvD/MXPiIZslnlkXwM9+NOFNIVAJPrEz95eOvfFSQtTiZb571Pz84EDL2udLvfeBwYDhkQd4jn3e0SK4e+oyYfjEIT5JU7wcQdCIvJne61aVqCM1O8fKCx0Fnyb3aBqTqPf5bm3iL2S8VvEGgwDct4GJA3jEcRhF6b6VbHDBX4qfdeCramuEA8LxGK/nGn5hDoTYWzTU9mYpZdKGjKN6nIj+nikHm2Fbt6XORxh2CCkwYe8pqKcVLDjGEGeXgRhnQ4jmpHmDDKTAwriBXXKuedKdSAeMNT7Mh4+6YzPDphMDodzBl7gM+cDMw/ew4Fh5zBGxZfSm1y1CicSmizAkxeQ9YCKcmgU/bbuyuZUrA1osoqjY17aKGUjlnWK+VkLrT4X2f/P8AZluwqD2a9K+TGHLHs2dOe7KlzHfPsoSw09pqlRxoI0v/AJbNHsSbLLOhSQlRyvy28ozrRtWa5ZmJvNUMyq4LVzrdCAQfKF5H2S+9/wAGq+wZcmv2u0S5LEYSpZM2YWwp6y5WgpXUfCF7RtiYko2aSyopJ9Z6tRfmDc8zMKN2AocaxiLuw5DDvVKsepgbMAKNQcMv6VOPNjC6/TQLFf1O/sq+xdaDKlB1WulTTttwGEUmTQpxNSc64k/npkB9wdYtaJTqt4YacQOFMFHKFpdnyvVFcgB2m5D4mJdmyodtNgW7fv8AEscQeXyisoEUujH3QdN7vx3Rw3ACq6ZonFj7zRyMKGpNwnE+9MbcBuh6FuilQMc1U1rq7/KFHmkksTj9ZQxbpT+0ww0AyUbuHOAWaSXNMgMSdAIl+hSqrHrHaXoWZqoN+ZOgBiIJKlh8cpSZV97eTHRVsil6EWk3CHXXAjQ/KBX7hvr2pbZjdz4xqWyzXSQRhqIzBIaWSVF5DmN43Eb4c4OLJxZFNWjpoULXOUx6oeHyisjZpLYkFdCPe+UXSWApeWar7yNu+cTZairSjVcyhzHL5xBq/YtbkWWPwtmnxH3TApZripLUGY9teBHviB2qWZhLqSd6n2l6ajlCSsQajAwN7BLRpUFNLupAqv6kzQ8RDEmcFQgLQUNGBvLU79R1EJSJjPUkEke8po3yaDLSualusp/kYaYmhNJLj2DX8pr4D4wzYZbOWDUqBqq18qxaa1Pa/rTyZYlXPut0WaPJxAkDbaAWieUYrgafm/8AaKS595gCFxIFaA586w4VJ0buln4RxDDRv5pa+IgoLRG0LM4C3SxGII07hhCSWU5Eiu4do9w+JhpyD7RXq7Oe4YRehpgHI3ACWvXWBpNgm0gnr2ACVoAKUwZz0GC9YE2Boagn3VN52/M2nKKCaqihYAfdl6/mcweySr4qtEU4UX2v1McYfJPAG0TFUUahIyRfZX8xGZhT7U169XEZbgNwGgiLVZyjXT0O/lBZdkCi9MN0aL7zdNInZapI1rJbA6kns0zrl3wlMq5uoLkvMtSgPH9o6X2hVxclDIbz5tEM7TeyvZQZ/v8AKKbshRplvVGYLsvCWup946mOgbTwaSpdbtcTmTv6RMIqj7DtfZMjaMn7VZaX/fTAGuZDDRvA58Y+V2tihqovDX9oJZLQ6Kyq7AOLrgEgMK1oRqOcNbM2fMtExZUpauxw3AaknQCN55OvSODBg+Htyl8v9Ix5ukyVn7w+a6wKXdc1ln1b7tDyOnKPRbe9GZlmmsCCtMjT2wPe3UO7TnGPNsyMe2KHeMAecZyxyjydWPxGOauLF5rXiPWAy3GAcDA8/mIiYhOMxa/jSmPPfB5peWDe7cvjmOsAkrrJf9DYH5GMzYd2cqBaKwbU6Hu0jIt8y87E76DkIZmmp/xEZGHvKPMReXebAOkwbnGPccYb2qEtOxCXaGX2WI4Vw7o0LIHmKSShxpio3bxSKTbOB7UthxVq+BgtitkpBQFs64jlu5QJb2EnrSFbRMusVMtDT83P70D+2f8ATT+U/OD2tUdywmAVpgQ24CA/Z0/5o/lYwmNVWxuwAuCQQtDSiqo8aVhTaEtlcgknUVNYasLpLqQxeugQ/GL2idfI/wAFmIyrUZ8oqk0TbUvYygtcBiY07AGlGrkKpzBOJ3EARdb4HaZZQ3LQE/GAO8oHsq0xt5rj0zMJKtjb6tDZtRmGktcvfYZct0LTmRTj/iPvJwrx38oK8lmWsxxLXRQKAdNYAs9UwlISTgHYVP6RDb9RJen59w4QU9ZP6L8hpEGW81aKAiDJd/OOkWRr1+acdxxJ+X1lD6hnwAoIqMHIznkjDkUlyLgpLxY5t8o6Povot6Dlh66efVygL2OBIGNcfZXif3jo38hep5k/1NJ0jwBOFRiOEL2Xazo4eWzIQcCpIIpE3CmK5borOkrMxBut9d8cqk0evKCkqZ9M2D6eyLSgkbQUcJlMK72AxQ/iGHKI296Akr62zMJ0sioAILU4EYOOXdHyhwye0Oukbvo56W2iyGsqZ2dZbdpG/ToeIoY6IZlxI8zL4GUX1YnXt2KWiyPLJBHAgj4RlzpcsmmMtuXZ/aPo22fTaz2yzMGs920YANgVAriQwo2Q9kjUZx4+TY/WussLVnYKo4sQB5xORRb+U6fDTydLeVVQkkqYoFxw43HHuMJz3QsQ6FW1KmvgY3rd6LT5DG+jpjhnThjkYQmS3yZQ3MRLxSXJpHxOOXDEkA9ycRwao/aGGWZ7rI/MLEBEBqUpyx8IHNlyTh7J64RNNGqkmXLTv+UncPnHS5Mw/wClLHNf3hcWRdJ3gfnBksqUxmEnn8IVMOpfiZek7IBEH6R84Gwb35wpqFPyis2ySvvnuJiAklfvsekG/wAYJrt/RJEr3Vdz1FecdLnTDhLlheQx/mMNSrST7MunOGpVlmuaY46CLjBy4Mp5Yw+r+RGVZAvamtVt1STBPtTt2ZSUpmToMstI9fsf0AtE2hMu4N79nwzPdHpv+A7P2eC1pnKXZCtzUq1K0RasdMeRwjTya5dHJL9QhdRXU/RHzCyWahq7Fjr+0fTrHL2dYJKTps1ZrsLyKuNfypzwvNShGhj5/a/V3j6li0vNScDTS8N4yhK0ygwpkdDBGbhovLgXiEpW0vQ1/S/05nWw3f8ALlVwlqc9xc+8eGQ3ax0eNeSxYrTH613R0YyyOzqx+HxwjSRrSZyuKqemohZ0YGp8MoQs8pi3ZqCOlIel20jszB1+YjPk34DLNqKNiIDMsIOKGnDT9oZWWpxU4cIky90PYtHWaXdUDXXnBjtJ5DLMltdmA1VsDSmtCKf3gF8jOBz5SvmSCPrlDUiXBNU+D2+zP4uTlF20SUmjIkf4bHmKFT3CNiX6T7GtP+YhktxQgf8A51HfHyd9nt7rA88IA0hxmp6Y+UaRzyRxz/TsMtrT9mfZB6J7NtH/ANe1oTuvo5/lqDHz/bVhRJ8yWKEI5QGmdzs160jyxffHojFPL1raDF4WWGV9Ta9zd9HfQSZapRmyygUMVoTQ1AB3cY1R/C2fvl/zftHiJ22LRJosmdMRTiQkx1BOVaA0rljwih9LLbSn2uf/AN2Z84ayxWqIyeG8RKTcZqj6DL/hXN1mSx1b/wBYDt/0CFls7zA4ZgykgClFxVtccWU/pj55M2/aW9q0TjzmOf8AygNhtzI96pNQVaprUNga/WkHnReqJXhPEJ9Tycdq59j0Gz3VJiM631DAsuIvLXtDDhWPaWr+JNjs9VslkJYYXmuoO8XmPWkeGEZu1bISwZRWuBHL9sOkLrlFaNZeGx5ZJzN7bH8SbdOqPWCSp92ULp/mJL9xEeRmzySSSSTiScSTvJ1g0vZrn2iF8TBVsspczU8fkIycpPk6seLHjVRVfsL2Kc97sgkRrM8L+uw7IwihasT1F9IVpu7Ex0USWagg0+IjoLY9B5M1WxU/PrCu1FYgXVqNTCU4XG7JIjVsc0stTnBd6FVbMOXNKmqkiNCRtT746j5Q3aLIrC8RQ8MIwTCdorTN5Sj4q1frdFHkHnGXKQXa61gsu2uuteePjnBoB2XKOdSIkmYNxhqWa0rFigiqJszTbQfaWvj5wVdpLxEUtFiUZE+HyjNaJtodJmnNnyXperh+b4QO7Z95/qhwyV3CFtpyFVcBTEQwKD7PxP8ANFxPkDJK9K+ZjJhvZnt9DAmDXcf/AOKaJLP1yhWftGZWlAsalIDMsys3aFfrhDdslUjJa0Mc2MP2GUCtSuPHXlDSylGSjugNtnlRhTrAl3G5dkHIhdrTLTnwxMZc20u2bHlkO4QEwnL0HXqaLWl39kUG+Jimy3NSNI6ATdaP/9k="}}
         style = { {
           height:"88%",
           width:"100%",
           position:"absolute",
           bottom:0
                   }}
       />
        <View style = {styles.userinfoContainer}>
            <TouchableOpacity style = {styles.imagecontainer}>
                <Image
                 source = {{uri:userAvatar}}
                 style = {styles.userAvatar}
                />
            </TouchableOpacity>
            <View style = {styles.userinfo}>
                <View style = {styles.UsertextName}>
                    <Text style = {{  
                        fontFamily:"SFUIDisplay-Medium",
                        fontSize:30,}}>
                        {userName}
                    </Text>
                    <View style = {styles.online}>
                       <MaterialIcons
                       name = {"circle"}
                       color={"green"}
                      
                       />
                    </View>
                    <View style = {styles.ButtonContainers}>
                     <TouchableOpacity  style = {styles.CallButton}>
                        <MaterialIcons
                          name = {"call"}
                          color={"black"}
                          size = {25}  
                          
                          />
                        </TouchableOpacity>
                        <TouchableOpacity  style = {styles.CallButton}>
                        <MaterialIcons
                          name = {"video-call"}
                          color={"black"}
                          size = {25}  
                          
                          />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        <View style = {styles.Giftedchat}>
            <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
MainContainer:{
    flex:1,
},
Giftedchat:{
    height:"84%",
    width:"100%",
    position:"absolute",
    bottom:0,
   

},
userinfoContainer:{
    height:"16%",
    width:"100%",
    flexDirection:"row",
   


},
imagecontainer:{
    marginTop:5,
    width:"28%",
    height:"100%",
    marginLeft:2
},
userAvatar:{
    height:100,
    width:100,
    borderRadius:100,
},
userinfo:{
    borderBottomWidth:2,
    width:"72%",
    height:"75%",
},
UsertextName:{
   
    marginTop:20,
    fontFamily:"SFUIDisplay-Medium",
    fontSize:25,
    marginLeft:18,
    fontWeight:"bold",
    flexDirection:"row",
},
online :{
    marginTop:15,
    marginLeft:2
  
},

ButtonContainers:{
 
   width:500,
   height:500,
   marginLeft:10,
   flexDirection:"row",
  
},
CallButton:{
  marginTop:-15,
  borderWidth:2,
  borderRadius:45,
  height:45,
  width:45,
  alignItems:"center",
  justifyContent:"center",
  marginLeft:5

}
})
import Head from 'next/head'
import Template from '../components/templates/default'
import '../styles/custom-theme.less'

export default function Home() {
  return (
    <Template>
      <Head>
        <title>Uneek Jewelry</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>
      <main>
        <img className="header-main-img" src="images/header-image.png" />
        <h1>Main Content Goes Here</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Nulla facilisi nullam vehicula ipsum a arcu. Rhoncus mattis rhoncus urna neque. Tristique risus nec feugiat in fermentum posuere urna nec tincidunt. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Diam ut venenatis tellus in metus. Leo vel fringilla est ullamcorper eget nulla. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Auctor eu augue ut lectus.

Auctor augue mauris augue neque gravida in fermentum et sollicitudin. Libero justo laoreet sit amet cursus sit. Ut porttitor leo a diam. Urna cursus eget nunc scelerisque viverra mauris in aliquam. Leo vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Duis at consectetur lorem donec massa. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Sagittis id consectetur purus ut. Urna neque viverra justo nec ultrices dui sapien eget mi. Dictum varius duis at consectetur lorem.

Non arcu risus quis varius quam quisque id diam. Quis lectus nulla at volutpat diam ut venenatis tellus in. Ornare massa eget egestas purus. Adipiscing elit pellentesque habitant morbi tristique. Viverra maecenas accumsan lacus vel facilisis volutpat. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Sapien et ligula ullamcorper malesuada proin libero. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Malesuada fames ac turpis egestas integer eget aliquet nibh. Lacus sed turpis tincidunt id aliquet risus feugiat in ante. A diam sollicitudin tempor id eu nisl nunc mi. Tristique magna sit amet purus gravida quis blandit. Tempor orci dapibus ultrices in iaculis nunc. Mauris ultrices eros in cursus. Cras semper auctor neque vitae tempus quam.

Velit sed ullamcorper morbi tincidunt ornare massa. Et malesuada fames ac turpis egestas maecenas pharetra. Eget mi proin sed libero enim sed faucibus turpis in. In tellus integer feugiat scelerisque varius morbi. Accumsan sit amet nulla facilisi. Habitant morbi tristique senectus et netus et malesuada fames ac. Sed enim ut sem viverra aliquet. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Semper risus in hendrerit gravida rutrum quisque non tellus. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Enim neque volutpat ac tincidunt vitae semper quis. In metus vulputate eu scelerisque felis imperdiet proin. Cursus eget nunc scelerisque viverra mauris. Dui ut ornare lectus sit amet est placerat in. Integer eget aliquet nibh praesent. Imperdiet proin fermentum leo vel.

Dignissim convallis aenean et tortor at risus viverra adipiscing. Massa ultricies mi quis hendrerit dolor magna eget est. Cum sociis natoque penatibus et. Sagittis eu volutpat odio facilisis mauris sit. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. In ante metus dictum at tempor commodo. Diam ut venenatis tellus in metus vulputate. Vitae congue eu consequat ac felis donec et. Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan. Faucibus ornare suspendisse sed nisi lacus sed viverra. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Eros in cursus turpis massa tincidunt dui ut.</p>
      </main>
      <style jsx>{`
        .header-main-img {
          width: 100%;
        }
      `}
      </style>
    </Template>
  )
}

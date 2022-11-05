import { Box, Heading, ListItem, OrderedList, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from 'src/components/footer'
import UnauthenticatedHeader from 'src/components/header/UnauthenticatedHeader'

const PrivacyPolicy: NextPage = () => {
  return (
    <>
      <Head>
        <title>俺の映画リスト | プライバシーポリシー</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <UnauthenticatedHeader />

      <Box placeItems="center" maxW="70%" p={70}>
        <Heading as="h1">プライバシーポリシー</Heading>
        <br />
        <Text>
          本サービスは、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
        </Text>
        <br />
        <Heading as="h2">第1条（個人情報）</Heading>
        <br />
        <Text>
          本サービスでは登録およびご利用に際して以下の情報を取得し、それらを個人情報として取り扱います。
        </Text>
        <OrderedList>
          <ListItem>Googleに関する情報</ListItem>
          <ListItem>その他本サービスへのアクセス時に生成されるログ</ListItem>
        </OrderedList>
        <br />
        <Heading as="h2">第2条（個人情報を収集・利用する目的）</Heading>
        <br />
        <Text>
          本サービスが個人情報を収集・利用する目的は、以下のとおりです。
        </Text>
        <OrderedList>
          <ListItem>本サービスの提供・運営のため</ListItem>
          <ListItem>
            ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）
          </ListItem>
          <ListItem>
            メンテナンス、重要なお知らせなど必要に応じたご連絡のため
          </ListItem>
          <ListItem>
            利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため
          </ListItem>
          <ListItem>
            ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため
          </ListItem>
          <ListItem>上記の利用目的に付随する目的</ListItem>
        </OrderedList>
        <br />
        <Heading as="h2">第3条（利用目的の変更）</Heading>
        <br />
        <OrderedList>
          <ListItem>
            本サービスは、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
            <OrderedList>
              <ListItem>
                人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
              </ListItem>
              <ListItem>
                公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
              </ListItem>
              <ListItem>
                国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
              </ListItem>
              <ListItem>
                予め次の事項を告知あるいは公表し、かつ本サービスが個人情報保護委員会に届出をしたとき
                <OrderedList>
                  <ListItem>利用目的に第三者への提供を含むこと</ListItem>
                  <ListItem>第三者に提供されるデータの項目</ListItem>
                  <ListItem>第三者への提供の手段または方法</ListItem>
                  <ListItem>
                    本人の求めに応じて個人情報の第三者への提供を停止すること
                  </ListItem>
                  <ListItem>本人の求めを受け付ける方法</ListItem>
                </OrderedList>
              </ListItem>
            </OrderedList>
          </ListItem>
          <ListItem>
            利用目的の変更を行った場合には、変更後の目的について、本サービス所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。
            <OrderedList>
              <ListItem>
                本サービスが利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
              </ListItem>
              <ListItem>
                合併その他の事由による事業の承継に伴って個人情報が提供される場合
              </ListItem>
              <ListItem>
                個人情報を特定の者との間で共同して利用する場合であって、その旨並びに共同して利用される個人情報の項目、共同して利用する者の範囲、利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について、あらかじめ本人に通知し、または本人が容易に知り得る状態に置いた場合
              </ListItem>
            </OrderedList>
          </ListItem>
        </OrderedList>
        <br />
        <Heading as="h2">第4条（個人情報の第三者提供）</Heading>
        <br />
        <OrderedList>
          <ListItem>
            本サービスは、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
          </ListItem>
          <ListItem>
            前項の定めにかかわらず、次に掲げる場合には、当該情報の提供先は第三者に該当しないものとします。
          </ListItem>
        </OrderedList>
        <br />
        <Heading as="h2">第5条（プライバシーポリシーの変更）</Heading>
        <br />
        <OrderedList>
          <ListItem>
            本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
          </ListItem>
          <ListItem>
            本サービスが別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
          </ListItem>
        </OrderedList>
        <br />
        <Text>2022年 10月12日 制定</Text>
        <Text align="right">以上</Text>
      </Box>
      <Footer />
    </>
  )
}

export default PrivacyPolicy

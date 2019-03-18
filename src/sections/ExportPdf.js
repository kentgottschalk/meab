import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, PDFDownloadLink, StyleSheet, Text, View } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    margin: 10,
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: 'flex',
  },
  unit_section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: 'red',
    display: 'flex',
  },
  heading: {
    textAlign: 'center',
  },
});

const MyDoc = props => {
  const { army, pdflistname, pdfplayername } = props;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Middle Earth Army List</Text>
        <Text style={styles.listname}>{pdflistname}</Text>
        <View
          render={() =>
            pdflistname !== '' && (
              <View style={{ background: 'red' }}>
                <Text>{pdflistname}</Text>
              </View>
            )
          }
        />
        <View style={styles.section}>
          <Text>{pdfplayername}</Text>
        </View>
        <View style={styles.section}>
          <Text>{army.points}</Text>
          <Text>{army.side}</Text>
        </View>
        <View style={styles.unit_section}>
          <View>
            {army.warbands.map(warband => {
              const warbandname = army.factions
                .filter(item => item.fid === warband.faction)
                .map(item => item.name);
              return (
                <View key={warband.warbandId}>
                  <Text>{warbandname}</Text>
                  {warband.units.map(unit => {
                    const unitdata = army.unitdata.filter(item => item.uid === unit.uid);
                    const unitname = unitdata.map(item => item.name);
                    return (
                      <View key={unit.unitId}>
                        <View>
                          <Text>{unitdata.type !== 'Warrior' ? 'Hero' : unit.number}</Text>
                        </View>
                        <View>
                          <Text>{unitname}</Text>
                        </View>
                        <View>
                          <Text>Points</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const ExportPdf = props => {
  const { pdfsavename } = props;
  return (
    <div>
      <PDFDownloadLink
        document={MyDoc(props)}
        fileName={pdfsavename}
        className="savelink floatright"
      >
        {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
    </div>
  );
};

MyDoc.defaultProps = {
  pdflistname: '',
  pdfplayername: '',
};

MyDoc.propTypes = {
  army: PropTypes.instanceOf(Object).isRequired,
  pdflistname: PropTypes.string,
  pdfplayername: PropTypes.string,
};

ExportPdf.propTypes = {
  pdfsavename: PropTypes.string.isRequired,
};

export default ExportPdf;

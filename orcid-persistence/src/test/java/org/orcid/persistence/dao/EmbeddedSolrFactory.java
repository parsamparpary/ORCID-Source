package org.orcid.persistence.dao;

import java.io.File;
import java.io.FileNotFoundException;
import java.net.URL;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.embedded.EmbeddedSolrServer;
import org.apache.solr.core.CoreContainer;

/**
 * Factory method to wire in an embedded solr server to the SolrDao for testing
 * 
 * @author jamesb
 * 
 */
class EmbeddedSolrFactory {
    
    private static CoreContainer coreContainer;
    
    public static SolrClient createInstance() throws Exception {
        return createInstance("");
    }

    public static SolrClient createInstance(String coreName) throws Exception {
        if(coreContainer == null){
            coreContainer = createCoreContainer();
        }
        EmbeddedSolrServer server = new EmbeddedSolrServer(coreContainer, coreName);
        return server;
    }

    private static CoreContainer createCoreContainer() throws FileNotFoundException {
        URL solrHome = EmbeddedSolrFactory.class.getResource("/solr");
        URL solrXml = EmbeddedSolrFactory.class.getResource("/solr" + "/solr.xml");
        File solrHomeDir = new File(solrHome.getFile());
        System.setProperty("solr.solr.home", solrHomeDir.getAbsolutePath());
        File solrXmlFile = new File(solrXml.getFile());;
        return CoreContainer.createAndLoad(solrHomeDir.toPath(), solrXmlFile.toPath());
    }
}
